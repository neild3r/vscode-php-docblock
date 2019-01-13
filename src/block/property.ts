import { Block } from "../block";
import { Doc, Param } from "../doc";

/**
 * Represents an property block
 */
export default class Property extends Block
{

    /**
     * @inheritdoc
     */
    protected pattern:RegExp = /^\s*(static)?\s*(protected|private|public)\s+(static)?\s*(\$[A-Za-z0-9_]+)\s*\=?\s*([^;]*)/m;

    /**
     * @inheritdoc
     */
    public parse():Doc
    {
        let params = this.match();

        let doc = new Doc('Undocumented variable');
        let type;

        if (params[5]) {
            type = this.getTypeFromValue(params[5]);
        } else {
            type = '[type]';
        }

        doc.var = new Param(type, params[4]);

        return doc;
    }
}
