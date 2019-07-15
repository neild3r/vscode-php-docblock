import * as assert from 'assert';
import {TextEditor, TextDocument, commands, Selection} from 'vscode';
import Helper from './helpers';

suite("Command tests", () => {
    let editor:TextEditor;
    let document:TextDocument;

    suiteSetup(function(done) {
        Helper.loadFixture('commands.php', (edit:TextEditor, doc:TextDocument) => {
            editor = edit;
            document = doc;
            done();
        });
    });

    test("Command: trigger", () => {
        editor.selection = new Selection(2, 0, 2, 0);
        assert.doesNotThrow(async () => {
            await commands.executeCommand('php-docblocker.trigger', editor)
        });
    });

    test("Command: re-parse", () => {
        editor.selection = new Selection(7, 0, 7, 0);
        assert.doesNotThrow(async () => {
            await commands.executeCommand('php-docblocker.re-parse', editor)
        });
    });
});
