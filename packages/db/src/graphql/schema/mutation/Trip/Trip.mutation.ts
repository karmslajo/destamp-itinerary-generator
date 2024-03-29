import { booleanArg, intArg, mutationField, nonNull, stringArg } from 'nexus';

import { createTrip, deleteTrip, regenerateTrip } from './Trip.resolver';

export const CreateTrip = mutationField('createTrip', {
  type: 'Trip',
  args: {
    isPremium: nonNull(booleanArg()),
    userId: nonNull(stringArg()),
    tripInput: nonNull('CreateTripInput'),
    tripPreferenceInput: nonNull('CreateTripPreferenceInput'),
  },
  resolve: (_, args, ctx) =>
    createTrip(
      args.isPremium,
      args.userId,
      args.tripInput,
      args.tripPreferenceInput,
      ctx,
    ),
});

export const DeleteTrip = mutationField('deleteTrip', {
  type: 'Trip',
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_, args, ctx) => deleteTrip(args.id, ctx),
});

export const RegenerateTrip = mutationField('regenerateTrip', {
  type: 'Trip',
  args: {
    isPremium: nonNull(booleanArg()),
    id: nonNull(intArg()),
  },
  resolve: (_, args, ctx) => regenerateTrip(args.isPremium, args.id, ctx),
});
