import { router } from '../../../bin/trpc';
import { get, create, remove } from '../procedures';

export const payment = router({
  get,
  create,
  remove,
});
