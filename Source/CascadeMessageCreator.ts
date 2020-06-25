/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { CascadingBuild } from '@dolittle/github-actions.shared.rudiments';
import { ICreateCascadeMessage } from './ICreateCascadeMessage';

/**
 * Represents an implementation of {ICreateCascadeMessage}
 *
 * @export
 * @class CascadeMessageCreator
 * @implements {ICreateCascadeMessage}
 */
export class CascadeMessageCreator implements ICreateCascadeMessage {

    /**
     * @inheritdoc
     */
    create(originRepo: {owner: string, repo: string}, version: string) {
        return `${CascadingBuild.message} ${originRepo.owner}/${originRepo.repo} released ${version}`;
    }
}
