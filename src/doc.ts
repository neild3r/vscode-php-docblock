import {workspace, SnippetString, WorkspaceConfiguration} from 'vscode';
import Config from './util/config';

/**
 * Represents a comment block.
 *
 * This class collects data about the snippet then builds
 * it with the appropriate tags
 */
export class Doc
{
    /**
     * List of param tags
     *
     * @type {Array<Param>}
     */
    public params:Array<Param> = [];

    /**
     * Return tag
     *
     * @type {string}
     */
    public return:string;

    /**
     * Var tag
     *
     * @type {string}
     */
    public var:string;

    /**
     * The message portion of the block
     *
     * @type {string}
     */
    public message:string;

    /**
     * Define the template for the documentor
     *
     * @type {Object}
     */
    protected _template:Object;

    /**
     * Creates an instance of Doc.
     *
     * @param {string} [message='']
     */
    public constructor(message:string = '')
    {
        this.message = message;
    }

    /**
     * Set class properties from a standard object
     *
     * @param {*} input
     */
    public fromObject(input:any):void
    {
        if (input.return !== undefined) {
            this.return = input.return;
        }
        if (input.var !== undefined) {
            this.var = input.var;
        }
        if (input.message !== undefined) {
            this.message = input.message;
        }
        if (input.params !== undefined && Array.isArray(input.params)) {
            input.params.forEach(param => {
                this.params.push(new Param(param.type, param.name));
            });
        }
    }

    /**
     * Build all the set values into a SnippetString ready for use
     *
     * @param {boolean} [isEmpty=false]
     * @returns {SnippetString}
     */
    public build(isEmpty:boolean = false):SnippetString
    {

        let extra = Config.instance.get('extra');
        let gap = Config.instance.get('gap');
        let returnGap = Config.instance.get('returnGap');
        let alignParams = Config.instance.get('alignParams');
        // Align return is false if align params is not active.
        let alignReturn = alignParams ? Config.instance.get('alignReturn') : false;

        let returnString = "";
        let varString = "";
        let paramString = "";
        let extraString = "";
        let messageString = "";

        if (isEmpty) {
            gap = true;
            extra = [];
        }

        messageString = "\${###" + (this.message != "" ? ':' : '') + this.message + "}";

        // Loop through params and find max length of type and name.
        let maxParamTypeLength = 0;
        let maxParamNameLength = 0;
        if (this.params.length && alignParams) {
            this.params.forEach(param => {
                let paramType = param.type;
                if (paramType.length > maxParamTypeLength) {
                    maxParamTypeLength = paramType.length;
                }
                let paramName = param.name.replace('$', '\\$')
                if (paramName.length > maxParamNameLength) {
                    maxParamNameLength = paramName.length;
                }
            });
        }
        // If align return is active, check if it has a longer type.
        if (this.return && (this.return != 'void' || Config.instance.get('returnVoid')) && alignReturn) {
            let returnType = this.return;
            if (returnType.length > maxParamTypeLength) {
                maxParamTypeLength = returnType.length;
            }
        }

        if (this.params.length) {
            paramString = "";
            this.params.forEach(param => {
                if (paramString != "") {
                    paramString += "\n";
                }

                let paramType = param.type;
                let paramName = param.name.replace('$', '\\$');

                let prependSpace = '';
                let appendSpace = '';
                if (alignParams) {
                    // Append additional spaces on param type and param name.
                    prependSpace = Array(maxParamTypeLength - paramType.length).fill(' ').join('');
                    // Add 1 to array size, so there is already a space appended for typing comments.
                    appendSpace = Array(1 + maxParamNameLength - paramName.length).fill(' ').join('');
                }

                paramString +=
                    "@param " +
                    // Add extra space to align '@param' and '@return'.
                    (alignReturn ? ' ' : '') +
                    "\${###:"+paramType+"} " +
                    prependSpace + paramName + appendSpace;
            });
        }

        if (this.var) {
            varString = "@var \${###:" +this.var + "}";
        }

        if (this.return && (this.return != 'void' || Config.instance.get('returnVoid'))) {
            let appendSpace = '';
            if (alignReturn) {
                appendSpace =
                    Array(1 + maxParamTypeLength - this.return.length).fill(' ').join('') +
                    Array(maxParamNameLength).fill(' ').join('');
            }
            returnString = "@return \${###:" +this.return + "}" + appendSpace;
        }

        if (Array.isArray(extra) && extra.length > 0) {
            extraString = extra.join("\n");
        }


        let templateArray = [];
        for (let key in this.template) {
            let propConfig = this.template[key];
            let propString:string;
            if (key == 'message' && messageString) {
                propString = messageString;
                if (gap) {
                    propConfig.gapAfter = true;
                }
            } else if (key == 'var' && varString) {
                propString = varString;
            } else if (key == 'return' && returnString) {
                propString = returnString;
                if (returnGap) {
                    propConfig.gapBefore = true;
                }
            } else if (key == 'param' && paramString) {
                propString = paramString;
            } else if (key == 'extra' && extraString) {
                propString = extraString;
            } else if (propConfig.content !== undefined) {
                propString = propConfig.content;
            }

            if (propString && propConfig.gapBefore && templateArray[templateArray.length - 1] != "") {
                templateArray.push("");
            }

            if (propString) {
                templateArray.push(propString);
            }

            if (propString && propConfig.gapAfter) {
                templateArray.push("");
            }
        }

        if (templateArray[templateArray.length - 1] == "") {
            templateArray.pop();
        }

        let templateString:string = templateArray.join("\n");
        templateString = "/**\n" + templateString + "\n */";

        let stop = 0;
        templateString = templateString.replace(/###/gm, function():string {
            stop++;
            return stop + "";
        });

        templateString = templateString.replace(/^$/gm, " *");
        templateString = templateString.replace(/^(?!(\s\*|\/\*))/gm, " * $1");

        let snippet = new SnippetString(templateString);

        return snippet;
    }

    /**
     * Set the template for rendering
     *
     * @param {Object} template
     */
    public set template(template:Object)
    {
        this._template = template;
    }

    /**
     * Get the template
     *
     * @type {Object}
     */
    public get template():Object
    {
        if (this._template == null) {
            return {
                message: {},
                var: {},
                param: {},
                return: {},
                extra: {}
            }
        }

        return this._template;
    }
}

/**
 * A simple paramter object
 */
export class Param
{
    /**
     * The type of the parameter
     *
     * @type {string}
     */
    public type:string;

    /**
     * The parameter name
     *
     * @type {string}
     */
    public name:string;

    /**
     * Creates an instance of Param.
     *
     * @param {string} type
     * @param {string} name
     */
    public constructor(type:string, name:string)
    {
        this.type = type;
        this.name = name;
    }
}
