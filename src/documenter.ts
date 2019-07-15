import {Range, Position, TextEditor, TextEditorEdit, workspace, SnippetString} from "vscode";
import FunctionBlock from "./block/function";
import Property from "./block/property";
import Class from "./block/class";
import {Doc, Param} from "./doc";

/**
 * Check which type of docblock we need and instruct the components to build the
 * snippet and pass it back
 */
export default class Documenter
{
    /**
     * The target position of the comment block
     *
     * @type {Position}
     */
    protected targetPosition:Position;

    /**
     * Capture the end position
     *
     * @type {Position}
     */
    protected targetEndPosition:Position;

    /**
     * We'll need an editor to pass to each editor
     *
     * @type {TextEditor}
     */
    protected editor:TextEditor;

    /**
     * Creates an instance of Documenter.
     *
     * @param {Range} range
     * @param {TextEditor} editor
     */
    public constructor(range:Range, editor:TextEditor)
    {
        this.targetPosition = range.start;
        this.targetEndPosition = range.end;
        this.editor = editor;
    }

    /**
     * Load and test each type of signature to see if they can trigger and
     * if not load an empty block
     *
     * @returns {SnippetString}
     */
    public autoDocument():SnippetString
    {
        let func = new FunctionBlock(this.targetPosition, this.editor);
        if (func.test()) {
            return func.parse().build();
        }

        let prop = new Property(this.targetPosition, this.editor);
        if (prop.test()) {
            return prop.parse().build();
        }

        let cla = new Class(this.targetPosition, this.editor);
        if (cla.test()) {
            return cla.parse().build();
        }

        return new Doc().build(true);
    }
}
