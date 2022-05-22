import { formatOptions, getBranchFromIndexedOptions } from '../utils/utils.js';
import inquirer from 'inquirer';

export async function branchSelect(options) {
    const indexedOptions = options.map((branchData, index) => ({
        ...branchData,
        index: index.toString(),
    }));
    const { formattedHeader, formattedChoices } = formatOptions(indexedOptions);

    const selection = await inquirer.prompt({
        type: 'list',
        name: 'target',
        message: formattedHeader,
        choices: formattedChoices,
        pageSize: 10,
        loop: false,
    });
    return getBranchFromIndexedOptions(indexedOptions, selection.target).branchname;
}

export async function branchMultiSelect(options) {
    const indexedOptions = options.map((branchData, index) => ({
        ...branchData,
        index: index.toString(),
    }));
    const { formattedHeader, formattedChoices } = formatOptions(indexedOptions, 1);

    const selection = await inquirer.prompt({
        type: 'checkbox',
        name: 'target',
        message: formattedHeader,
        choices: formattedChoices,
        pageSize: 10,
        loop: false,
    });
    console.log(indexedOptions);
    const getBranchName = (selectedOption) =>
        getBranchFromIndexedOptions(indexedOptions, selectedOption).branchname;

    return selection.target.map(getBranchName);
}
