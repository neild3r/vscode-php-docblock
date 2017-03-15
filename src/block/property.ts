import { Block } from "../block";
import { Doc, Param } from "../doc";

export default class Property extends Block {

    protected pattern:RegExp = /^\s*(abstract|final|static)?\s*(protected|private|public)\s+(static)?\s*(\$[A-Za-z0-9_]+)\s*\=?\s*(.*)$/;

    parse():Doc {
        let params = this.match();

        let doc = new Doc('Undocumented variable');
        doc.var = '[type]';

        return doc;
    }
}