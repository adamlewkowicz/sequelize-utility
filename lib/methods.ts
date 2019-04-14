import { Model } from 'sequelize';

interface IQueryOpts {
  where: object;
}

export const updateOrCreate = async function(
  this: Model,
  data: object,
  queryOpts: IQueryOpts,
  skipUpdate = false
): Promise<Model | void> {
  let hasBeenAffected = false;
  const { where } = queryOpts;

  if (where == null) {
    throw new Error('Where object cannot be null');
  }

  if (!skipUpdate) {
    const [affected] = await this.update(data, queryOpts);
    hasBeenAffected = affected;
  }

  if (skipUpdate || !hasBeenAffected) {
    const [foundOrCreated] = await this
      .findOrCreate({
        defaults: { ...data, ...where },
        where,
        limit: 1
      });
    return foundOrCreated;
  }
}