import {commands, ExtensionContext, IndentAction, languages, Range, Selection, TextEditor} from 'vscode';
import Completions from "./completions";
import Documenter from './documenter';
import DocSelector from './doc/selector';

/**
 * Run a set up when the function is activated
 *
 * @param {vscode.ExtensionContext} context
 */
export function activate(context: ExtensionContext)
{
    ['php', 'hack'].forEach(lang => {
        if (lang == 'hack') {
            languages.setLanguageConfiguration(lang, {
                wordPattern: /(-?\d*\.\d\w*)|([^\-\`\~\!\@\#\%\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
                onEnterRules: [
                    {
                        // e.g. /** | */
                        beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
                        afterText: /^\s*\*\/$/,
                        action: { indentAction: IndentAction.IndentOutdent, appendText: ' * ' }
                    }, {
                        // e.g. /** ...|
                        beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
                        action: { indentAction: IndentAction.None, appendText: ' * ' }
                    }, {
                        // e.g.  * ...|
                        beforeText: /^(\t|(\ \ ))*\ \*(\ ([^\*]|\*(?!\/))*)?$/,
                        action: { indentAction: IndentAction.None, appendText: '* ' }
                    }, {
                        // e.g.  */|
                        beforeText: /^(\t|(\ \ ))*\ \*\/\s*$/,
                        action: { indentAction: IndentAction.None, removeText: 1 }
                    }
                ]
            });
        }

        languages.registerCompletionItemProvider(lang, new Completions(), '*', '@');
    });

    commands.registerTextEditorCommand('php-docblocker.trigger', (textEditor:TextEditor) => {
        textEditor.selection = new Selection(textEditor.selection.start, textEditor.selection.start);
        let range = new Range(textEditor.selection.start, textEditor.selection.end);
        let documenter = new Documenter(range, textEditor);
        let snippet = documenter.autoDocument();
        textEditor.insertSnippet(snippet);
    });

    commands.registerTextEditorCommand('php-docblocker.re-parse', (textEditor:TextEditor) => {
        textEditor.selection = new Selection(textEditor.selection.start, textEditor.selection.start);
        let range = new Range(textEditor.selection.start, textEditor.selection.end);

        let selector:DocSelector = new DocSelector(textEditor);
        let existing:Range = selector.find(range);

        let documenter = new Documenter(new Range(existing.end, existing.end), textEditor);
        let snippet = documenter.autoDocument();

        textEditor.insertSnippet(snippet);
    });
}

/**
 * Shutdown method for the extension
 */
export function deactivate()
{
}
