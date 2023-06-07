import { router } from '../../../bin/trpc';
import { get, create } from '../procedures';

export const budget = router({
  get,
  create,
});
