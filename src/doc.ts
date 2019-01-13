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
     * @type {Param}
     */
    public var:Param;

    /**
     * The message portion of the block
     *
     * @type {string}
     */
    public message:string;

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
            this.var = new Param(input.var.type, input.var.name);
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
        let snippet = new SnippetString();
        let extra = Config.instance.get('extra');
        let gap = !Config.instance.get('gap');
        let returnGap = Config.instance.get('returnGap');

        if (isEmpty) {
            gap = true;
            extra = [];
        }

        let stop = 2;

        snippet.appendText("/**");

        if (this.var && this.getConfig().singleLineProperty) {
            snippet.appendText(" @var ");
            snippet.appendVariable('1', this.var.type);
            snippet.appendText(" ");
            snippet.appendVariable('2', this.var.name);
            snippet.appendText(" ");
            snippet.appendVariable('3', this.message);
            snippet.appendText(" */");

            return snippet;
        }

        snippet.appendText("\n * ");
        snippet.appendVariable('1', this.message);

        if (this.params.length) {
            if (!gap) {
                snippet.appendText("\n *");
                gap = true;
            }
            this.params.forEach(param => {
                snippet.appendText("\n * @param ");
                snippet.appendVariable(stop++ + '', param.type);
                snippet.appendText(" ");
                snippet.appendText(param.name);
            });
        }

        if (this.var) {
            if (!gap) {
                snippet.appendText("\n *");
                gap = true;
            }
            snippet.appendText("\n * @var ");
            snippet.appendVariable(stop++ + '', this.var.type);
        }

        if (this.return && (this.return != 'void' || Config.instance.get('returnVoid'))) {
            if (!gap) {
                snippet.appendText("\n *");
                gap = true;
            } else if (returnGap && this.params.length) {
                snippet.appendText("\n *");
            }
            snippet.appendText("\n * @return ");
            snippet.appendVariable(stop++ + '', this.return);
        }

        if (Array.isArray(extra) && extra.length > 0) {
            if (!gap) {
                snippet.appendText("\n *");
                gap = true;
            }
            for (var index = 0; index < extra.length; index++) {
                var element = extra[index];
                if (element != "") {
                    element = " " + element;
                }
                snippet.appendText("\n *");
                snippet.value += element;
            }
        }

        snippet.appendText("\n */");

        return snippet;
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
