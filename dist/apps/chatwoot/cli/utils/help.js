"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fullCommandPath = fullCommandPath;
exports.buildFormatHelp = buildFormatHelp;
function fullCommandPath(sub) {
    const parts = [];
    let cmd = sub;
    const name = cmd.name();
    if (name)
        parts.push(name);
    while (cmd && cmd.parent) {
        cmd = cmd.parent;
        const name = cmd.name();
        if (name && name != 'program')
            parts.push(name);
    }
    return parts.reverse().join(' ');
}
function buildFormatHelp(l) {
    return function formatHelp(cmd, helper) {
        var _a;
        const termWidth = helper.padWidth(cmd, helper);
        const helpWidth = (_a = helper.helpWidth) !== null && _a !== void 0 ? _a : 80;
        const callFormatItem = (term, description) => helper.formatItem(term, termWidth, description, helper);
        let output = [];
        const commandDescription = helper.commandDescription(cmd);
        if (commandDescription.length > 0) {
            output = output.concat([
                helper.boxWrap(helper.styleCommandDescription(commandDescription), helpWidth),
                '',
            ]);
        }
        const usage = helper.commandUsage(cmd);
        if (usage) {
            output.push(`${helper.styleTitle(l.r('cli.help.usage.title')) + '\n'} ${helper.styleUsage(helper.commandUsage(cmd))}`);
            output.push('');
        }
        const commandGroups = this.groupItems(cmd.commands, helper.visibleCommands(cmd), (sub) => sub.helpGroup() || l.r('cli.help.commands.defaultGroup'));
        commandGroups.forEach((commands, group) => {
            if (!commands.length) {
                return;
            }
            const commandLines = commands.map((sub) => {
                const commandTerm = helper.styleSubcommandTerm(helper.subcommandTerm(sub));
                const description = helper.subcommandDescription(sub);
                const styledDescription = description
                    ? helper.styleSubcommandDescription(description)
                    : '';
                return `${commandTerm} ${styledDescription}`;
            });
            output.push(helper.styleTitle(group));
            output.push(...commandLines);
            output.push('');
        });
        const argumentList = helper
            .visibleArguments(cmd)
            .map((argument) => callFormatItem(helper.styleArgumentTerm(helper.argumentTerm(argument)), helper.styleArgumentDescription(helper.argumentDescription(argument))));
        output = output.concat(this.formatItemList(l.r('cli.help.arguments.title'), argumentList, helper));
        const optionGroups = this.groupItems(cmd.options, helper.visibleOptions(cmd), (option) => { var _a; return (_a = option.helpGroupHeading) !== null && _a !== void 0 ? _a : l.r('cli.help.options.defaultGroup'); });
        optionGroups.forEach((options, group) => {
            const optionList = options.map((option) => callFormatItem(helper.styleOptionTerm(helper.optionTerm(option)), helper.styleOptionDescription(helper.optionDescription(option))));
            output = output.concat(this.formatItemList(group, optionList, helper));
        });
        if (helper.showGlobalOptions) {
            const globalOptionList = helper
                .visibleGlobalOptions(cmd)
                .map((option) => callFormatItem(helper.styleOptionTerm(helper.optionTerm(option)), helper.styleOptionDescription(helper.optionDescription(option))));
            output = output.concat(this.formatItemList(l.r('cli.help.globalOptions.title'), globalOptionList, helper));
        }
        return output.join('\n');
    };
}
//# sourceMappingURL=help.js.map