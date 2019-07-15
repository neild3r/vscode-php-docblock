import {TextEditor, TextLine, Position, Range} from "vscode";

/**
 * Class for finding the start and end position of a docblock so it can be re-parseed
 */
export default class DocSelector
{
    /**
     * Storage for the editor
     *
     * @type {TextEditor}
     */
    protected editor:TextEditor;

    /**
     * Construct the docblock with an editor so we can access text content
     *
     * @param {TextEditor} editor
     */
    public constructor(editor:TextEditor)
    {
        this.editor = editor;
    }

    /**
     * Find the docblock within the area of search
     *
     * @param {Position|Range} position
     * @returns {Range}
     */
    public find(position:Position): Range;
    public find(position:Range): Range
    public find(position): Range
    {
        let start:Position;
        let end:Position;
        if (position instanceof Range) {
            start = position.start;
            end = position.end;
        } else {
            start = position;
            end = position;
        }

        let line = this.editor.document.lineAt(start.line);
        if (!this.isStart(line) && !this.isMiddle(line) && !this.isEnd(line)) {
            throw new Error("Unable to find docblock start");
        }

        while (!this.isStart(line)) {
            if (line.lineNumber <= 1 || (!this.isMiddle(line) && !this.isEnd(line))) {
                throw new Error("Unable to find docblock start");
            }
            line = this.editor.document.lineAt(line.lineNumber - 1);
        }

        start = new Position(line.lineNumber, line.firstNonWhitespaceCharacterIndex);

        line = this.editor.document.lineAt(end.line);
        if (!this.isStart(line) && !this.isMiddle(line) && !this.isEnd(line)) {
            line = this.editor.document.lineAt(start.line);
        }

        while (!this.isEnd(line)) {
            if (line.lineNumber >= this.editor.document.lineCount - 1 || (!this.isMiddle(line) && !this.isStart(line))) {
                throw new Error("Unable to find docblock end");
            }
            line = this.editor.document.lineAt(line.lineNumber + 1);
        }

        end = line.range.end;

        return new Range(start, end);
    }

    /**
     * Is this line in the middle of a docblock
     *
     * @param {TextLine} line
     * @returns {boolean}
     */
    protected isMiddle(line:TextLine):boolean
    {
        return line.text.search(/^\s*\*/) >= 0;
    }

    /**
     * Is this line at the start of a docblock
     *
     * @param {TextLine} line
     * @returns {boolean}
     */
    protected isStart(line:TextLine):boolean
    {
        return line.text.search(/^\s*\/\*\*?/) >= 0;
    }

    /**
     * Is this line at the end of a docblock
     *
     * @param {TextLine} line
     * @returns {boolean}
     */
    protected isEnd(line:TextLine):boolean
    {
        return line.text.search(/^\s*\*\//) >= 0;
    }
}
