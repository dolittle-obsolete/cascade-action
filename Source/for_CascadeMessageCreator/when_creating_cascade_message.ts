/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { CascadingBuild } from '@dolittle/github-actions.shared.rudiments';
import { CascadeMessageCreator } from '../CascadeMessageCreator';

describe('when creating cascade message', () => {
    const cascading_build_message_creator = new CascadeMessageCreator();
    const repo = {owner: 'some', repo: 'repo'};
    const version = 'v1.0.0';
    const result = cascading_build_message_creator.create(repo, version);
    it('should create the correct message', () => result.should.equal(`${CascadingBuild.message} ${repo.owner}/${repo.repo} released ${version}`));
});
