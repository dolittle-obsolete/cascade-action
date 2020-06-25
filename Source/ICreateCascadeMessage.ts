/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Defines a system that can create a cascade message
 *
 * @export
 * @interface ICreateCascadeMessage
 */
export interface ICreateCascadeMessage {

    /**
     * Creates the cascade message
     *
     * @param {{owner: string, repo: string}} originRepo The repository that triggered the build
     * @param {string} version The version that triggered the build
     * @returns {string}
     */
    create(originRepo: {owner: string, repo: string}, version: string): string

}
