import {workspace, TextDocument, Position, CancellationToken, ProviderResult, CompletionItem, CompletionItemProvider, Range, SnippetString, CompletionItemKind, window} from "vscode";
import Documenter from "./documenter";
import Config from "./util/config";
import {doctrineTags} from './extra/doctrine'

/**
 * Completions provider that can be registered to the language
 */
export default class Completions implements CompletionItemProvider
{
    /**
     * List of tags and snippets that are filled in docblocks
     *
     * @type {Array}
     */
    protected tags = [
        {
            tag: '@api',
            snippet: '@api'
        },
        {
            tag: '@abstract',
            snippet: '@abstract'
        },
        {
            tag: '@after',
            snippet: '@after'
        },
        {
            tag: '@afterClass',
            snippet: '@afterClass'
        },
        {
            tag: '@author',
            snippet: '@author ${1:{{name}}} <${2:{{email}}}>'
        },
        {
            tag: '@backupGlobals',
            snippet: '@backupGlobals ${1:switch}'
        },
        {
            tag: '@backupStaticAttributes',
            snippet: '@backupStaticAttributes ${1:switch}'
        },
        {
            tag: '@before',
            snippet: '@before'
        },
        {
            tag: '@beforeClass',
            snippet: '@beforeClass'
        },
        {
            tag: '@category',
            snippet: '@category ${1:description}'
        },
        {
            tag: '@codeCoverageIgnore',
            snippet: '@codeCoverageIgnore'
        },
        {
            tag: '@codeCoverageIgnoreEnd',
            snippet: '@codeCoverageIgnoreEnd'
        },
        {
            tag: '@codeCoverageIgnoreStart',
            snippet: '@codeCoverageIgnoreStart'
        },
        {
            tag: '@copyright',
            snippet: '@copyright ${1:' + (new Date()).getFullYear() + '} ${2:Name}'
        },
        {
            tag: '@covers',
            snippet: '@covers ${1:fqcn}'
        },
        {
            tag: '@coversDefaultClass',
            snippet: '@coversDefaultClass ${1:fqcn}'
        },
        {
            tag: '@coversNothing',
            snippet: '@coversNothing'
        },
        {
            tag: '@dataProvider',
            snippet: '@dataProvider ${1:methodName}'
        },
        {
            tag: '@depends',
            snippet: '@depends ${1:methodName}'
        },
        {
            tag: '@deprecated',
            snippet: '@deprecated ${1:version}'
        },
        {
            tag: '@doesNotPerformAssertions',
            snippet: '@doesNotPerformAssertions'
        },
        {
            tag: '@example',
            snippet: '@example ${1:location} ${2:description}'
        },
        {
            tag: '@filesource',
            snippet: '@filesource'
        },
        {
            tag: '@final',
            snippet: '@final'
        },
        {
            tag: '@group',
            snippet: '@group ${1:group}'
        },
        {
            tag: '@global',
            snippet: '@global'
        },
        {
            tag: '@ignore',
            snippet: '@ignore ${1:description}'
        },
        {
            tag: '@inheritDoc',
            snippet: '@inheritDoc'
        },
        {
            tag: '@internal',
            snippet: '@internal ${1:description}'
        },
        {
            tag: '@large',
            snippet: '@large'
        },
        {
            tag: '@license',
            snippet: '@license ${1:MIT}'
        },
        {
            tag: '@link',
            snippet: '@link ${1:http://url.com}'
        },
        {
            tag: '@medium',
            snippet: '@medium'
        },
        {
            tag: '@method',
            snippet: '@method ${1:mixed} ${2:methodName()}'
        },
        {
            tag: '@package',
            snippet: '@package ${1:category}'
        },
        {
            tag: '@param',
            snippet: '@param ${1:mixed} \$${2:name}'
        },
        {
            tag: '@preserveGlobalState',
            snippet: '@preserveGlobalState ${1:switch}'
        },
        {
            tag: '@property',
            snippet: '@property ${1:mixed} \$${2:name}'
        },
        {
            tag: '@property-read',
            snippet: '@property-read ${1:mixed} \$${2:name}'
        },
        {
            tag: '@property-write',
            snippet: '@property-write ${1:mixed} \$${2:name}'
        },
        {
            tag: '@requires',
            snippet: '@requires ${1:mixed}'
        },
        {
            tag: '@return',
            snippet: '@return ${1:mixed}'
        },
        {
            tag: '@runInSeparateProcess',
            snippet: '@runInSeparateProcess'
        },
        {
            tag: '@runTestsInSeparateProcesses',
            snippet: '@runTestsInSeparateProcesses'
        },
        {
            tag: '@see',
            snippet: '@see ${1:http://url.com}'
        },
        {
            tag: '@since',
            snippet: '@since ${1:1.0.0}'
        },
        {
            tag: '@small',
            snippet: '@small'
        },
        {
            tag: '@source',
            snippet: '@source ${1:location} ${2:description}'
        },
        {
            tag: '@static',
            snippet: '@static'
        },
        {
            tag: '@subpackage',
            snippet: '@subpackage ${1:category}'
        },
        {
            tag: '@test',
            snippet: '@test'
        },
        {
            tag: '@testdox',
            snippet: '@testdox ${1:description}'
        },
        {
            tag: '@testWith',
            snippet: '@testWith ${1:elements}'
        },
        {
            tag: '@throws',
            snippet: '@throws ${1:Exception}'
        },
        {
            tag: '@ticket',
            snippet: '@ticket ${1:ticket}'
        },
        {
            tag: '@todo',
            snippet: '@todo ${1:Something}'
        },
        {
            tag: '@uses',
            snippet: '@uses ${1:MyClass::function} ${2:Name}'
        },
        {
            tag: '@var',
            snippet: '@var ${1:mixed}'
        },
        {
            tag: '@version',
            snippet: '@version ${1:1.0.0}'
        }
    ];

    /**
     * Have we injected in tag data yet
     *
     * @type {{}}
     */
    protected formatted = false;

    /**
     * Implemented function to find and return completions either from
     * the tag list or initiate a complex completion
     *
     * @param {TextDocument} document
     * @param {Position} position
     * @param {CancellationToken} token
     * @returns {ProviderResult<CompletionItem[]>}
     */
    public provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken):ProviderResult<CompletionItem[]>
    {
        let result = [];
        let match;

        if ((match = document.getWordRangeAtPosition(position, /\/\*\*/)) !== undefined) {
            let documenter:Documenter = new Documenter(match, window.activeTextEditor);

            let block = new CompletionItem("/**", CompletionItemKind.Snippet);
            block.detail = "PHP DocBlocker";
            block.documentation = "Generate a PHP DocBlock from the code snippet below.";
            let range = document.getWordRangeAtPosition(position, /\/\*\* \*\//);
            block.range = range;
            block.insertText = documenter.autoDocument();
            result.push(block);

            return result;
        }

        if ((match = document.getWordRangeAtPosition(position, /\@[a-z]*/)) === undefined) {
            return result;
        }

        let search = document.getText(match);

        let potential = this.getTags().filter((tag) => {
            return tag.tag.match(search) !== null;
        });

        potential.forEach(tag => {
            let item = new CompletionItem(tag.tag, CompletionItemKind.Snippet);
            item.range = match;
            item.insertText = new SnippetString(tag.snippet);

            result.push(item);
        });

        return result;
    }

    /**
     * Get the tag list for completions
     *
     * @returns {Array<{tag:string, snippet:string}>}
     */
    protected getTags():Array<{tag:string, snippet:string}>
    {
        if (!this.formatted) {
            this.addDoctrineTags();

            this.tags.forEach((tag, index) => {
                if (tag.tag == '@author') {
                    tag.snippet = tag.snippet.replace("{{name}}", Config.instance.get('author').name);
                    tag.snippet = tag.snippet.replace("{{email}}", Config.instance.get('author').email);
                    this.tags[index] = tag;
                }
            });

            this.formatted = true;
        }

        return this.tags;
    }

    protected addDoctrineTags() 
    {
        if (Config.instance.get('enableDoctrineCompilation')) {
            this.tags = this.tags.concat(doctrineTags)
        }
    }
}
