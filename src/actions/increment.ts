import { kv } from "@vercel/kv";

/**
 * Increments the view count for a given slug.
 *
 * This function is responsible for incrementing the view count of a given slug. It increments
 * the view count in the `views` hash of the `kv` store by 1 for the given slug.
 *
 * @param {string} slug The slug for which to increment the view count.
 * @returns {Promise<number>} A promise that resolves with the new view count.
 *
 * @example
 *
 * increment('example-slug')
 *   .then(newCount => console.log(`New count: ${newCount}`))
 *   .catch(err => console.error(`Failed to increment count: ${err}`));
 *
 * @throws {Error} When the `kv.hincrby` operation fails.
 */
const increment = async (slug: string): Promise<number> => await kv.hincrby("views", slug, 1);

export default increment;
