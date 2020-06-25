/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { GitHub } from '@actions/github/lib/utils';
import { ILogger } from '@dolittle/github-actions.shared.logging';
import { ICascades } from './ICascades';
import { ICreateCascadeMessage } from './ICreateCascadeMessage';

const masterRef = 'heads/master';

/**
 * Represents an implementation of {ICascades}
 *
 * @export
 * @class Cascades
 * @implements {ICascades}
 */
export class Cascades implements ICascades {

    /**
     * Instantiates an instance of {GithubBuildTrigger}.
     * @param {ILogger} _logger
     */
    constructor(
        private readonly _originRepo: {owner: string, repo: string},
        private readonly _cascades: string[],
        private readonly _cascadeMessageCreator: ICreateCascadeMessage,
        private readonly _github: InstanceType<typeof GitHub>,
        private readonly _logger: ILogger) {}

    /**
     * @inheritdoc
     */
    async trigger(version: string) {
        if (!this._cascades || this._cascades.length === 0) {
            this._logger.info('There are no cascades to trigger');
            return;
        }
        for (const cascade of this._cascades) {
            const [owner, repo] = cascade.split('/', 2);
            try {
                const message = this._cascadeMessageCreator.create(this._originRepo, version);
                await this._triggerCascade(message, owner, repo);
            }
            catch (error) {
                this._logger.warning(`Error occurred while triggering cascade on repository ${owner}/${repo}. ${error}`);
            }
        }

    }
    private async _triggerCascade(triggerMessage: string, owner: string, repo: string) {
        this._logger.debug(`Triggering cascade on ${owner}/${repo} with trigger message '${triggerMessage}'`);
        const ref = await this._issueCommit(triggerMessage, owner, repo);
        this._logger.debug(`New reference sha: ${ref.data.object.sha}`);

    }

    private async _issueCommit( message: string, owner: string, repo: string) {
        const referenceSha = await this._getReferenceCommitSha(owner, repo);
        const treeSha = await this._getTreeSha(referenceSha, owner, repo);
        const commit = await this._createCommit(message, treeSha, referenceSha, owner, repo);
        const updatedReference = await this._updateReference(commit.sha, owner, repo);
        return updatedReference;
    }

    private async _getReferenceCommitSha(owner: string, repo: string) {
        this._logger.debug('Getting reference commit');
        const reference = await this._github.git.getRef(
            {
                owner: owner,
                repo: repo,
                ref: masterRef
            });
        return reference.data.object.sha;
    }

    private async _getTreeSha (referenceSha: string, owner: string, repo: string) {
        this._logger.debug('Getting commit');
        const commit = await this._github.git.getCommit({
            owner: owner,
            repo: repo,
            commit_sha: referenceSha
        });
        return commit.data.tree.sha;
    }

    private async _createCommit (message: string, tree: string, referenceSha: string, owner: string, repo: string) {
        this._logger.debug('Creating commit');
        const commit = await this._github.git.createCommit({
            owner: owner,
            repo: repo,
            message,
            tree,
            parents: [referenceSha]
        });
        return commit.data;
    }

    private async _updateReference(commitSha: string, owner: string, repo: string) {
        this._logger.debug('Updating reference');
        const updatedReference = await this._github.git.updateRef({
            owner: owner,
            repo: repo,
            ref: masterRef,
            sha: commitSha,
            force: true
        });
        return updatedReference;
    }
}
