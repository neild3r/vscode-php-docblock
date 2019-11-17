import { Block } from "../block";
import { Doc, Param } from "../doc";
import TypeUtil from "../util/TypeUtil";
import { Range, Position } from "vscode";
import Config from "../util/config";

/**
 * Represents a function code block
 *
 * This is probably going to be the most complicated of all the
 * blocks as function signatures tend to be the most complex and
 * varied
 */
export default class FunctionBlock extends Block
{
    /**
     * @inheritdoc
     */
    protected pattern:RegExp = /^\s*((.*)(protected|private|public))?(.*)?\s*function\s+&?([A-Za-z0-9_]+)\s*\(([^{;]*)/m;

    /**
     * @inheritdoc
     */
    public parse():Doc
    {
        let params = this.match();

        let doc = new Doc('Undocumented function');
        doc.template = Config.instance.get('functionTemplate');
        let argString = this.getEnclosed(params[6], "(", ")");
        let head:string;


        if (argString != "") {
            let args = this.getSplitWithoutEnclosed(argString);

            if (Config.instance.get('qualifyClassNames')) {
                head = this.getClassHead();
            }

            for (let index = 0; index < args.length; index++) {
                let arg = args[index];
                let parts = arg.match(/^\s*(\?)?\s*([A-Za-z0-9_\\]+)?\s*\&?((?:[.]{3})?\$[A-Za-z0-9_]+)\s*\=?\s*(.*)\s*/m);
                var type = '[type]';

                if (parts[2] != null) {
                    parts[2] = TypeUtil.instance.getFullyQualifiedType(parts[2], head);
                }

                if (parts[2] != null && parts[1] === '?') {
                    type = TypeUtil.instance.getFormattedTypeByName(parts[2])+'|null';
                } else if (parts[2] != null) {
                    type = TypeUtil.instance.getFormattedTypeByName(parts[2]);
                } else if (parts[4] != null && parts[4] != "") {
                    type = TypeUtil.instance.getFormattedTypeByName(this.getTypeFromValue(parts[4]));
                }

                doc.params.push(new Param(type, parts[3]));
            }
        }

        let returnType:Array<string> = this.signature.match(/.*\)\s*\:\s*(\?)?\s*([a-zA-Z\\]+)\s*$/m);

        if (returnType != null) {
            if (Config.instance.get('qualifyClassNames')) {
                returnType[2] = TypeUtil.instance.getFullyQualifiedType(returnType[2], this.getClassHead());
            }

            doc.return = (returnType[1] === '?')
                ? TypeUtil.instance.getFormattedTypeByName(returnType[2])+'|null'
                : TypeUtil.instance.getFormattedTypeByName(returnType[2]);
        } else {
            doc.return = this.getReturnFromName(params[5]);
        }

        return doc;
    }

    /**
     * We can usually assume that these function names will
     * be certain return types and we can save ourselves some
     * effort by checking these
     *
     * @param {string} name
     * @returns {string}
     */
    public getReturnFromName(name:string):string
    {
        if (/^(is|has|can)/.test(name)) {
            return TypeUtil.instance.getFormattedTypeByName('bool');
        }

        switch (name) {
            case '__construct':
            case '__destruct':
            case '__set':
            case '__unset':
            case '__wakeup':
                return null;
            case '__isset':
                return TypeUtil.instance.getFormattedTypeByName('bool');
            case '__sleep':
            case '__debugInfo':
                return 'array';
            case '__toString':
                return 'string';
        }

        return 'void';
    }
}
