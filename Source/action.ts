// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import semver from 'semver';
import { getInput, setFailed } from '@actions/core';
import { getOctokit, context } from '@actions/github';
import { Logger } from '@dolittle/github-actions.shared.logging';
import { Cascades } from './Cascades';
import { CascadeMessageCreator } from './CascadeMessageCreator';

const logger = new Logger();

run();
export async function run() {
    try {
        const token = getInput('token', { required: true });
        const version = getInput('version', { required: true });
        if (!semver.valid(version)) throw new Error(`'${version}' is not a valid SemVer version`);

        const cascades = getInput('cascades', {required: true})?.split(',');
        const triggerVersion = version.startsWith('v') ? version : `v${version}`;
        await new Cascades(context.repo, cascades, new CascadeMessageCreator(), getOctokit(token), logger)
                    .trigger(triggerVersion);
    } catch (error) {
        fail(error);
    }
}


function fail(error: Error) {
    logger.error(error.message);
    setFailed(error.message);
}
