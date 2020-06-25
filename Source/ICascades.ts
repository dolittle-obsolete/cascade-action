/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Defines a system that knows about cascades.
 *
 * @export
 * @interface ICascades
 */
export interface ICascades {

    /**
     * Trigger cascades
     *
     * @returns {Promise<void>}
     */
    trigger(version: string): Promise<void>;
}
