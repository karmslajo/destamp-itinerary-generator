import { objectType } from 'nexus';
import { TravelSize } from '../enum';

const Trip = objectType({
  name: 'Trip',
  definition(t) {
    t.int('id'), 
    t.string('title');
    t.float('budget');
    t.field('destination', {
      type: 'Destination',
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.trip
          .findUniqueOrThrow({ where: { id: id } }).destination();
      },
    });
    t.field('travelSize', { type: TravelSize });
    t.nullable.int('adultCount');
    t.nullable.int('childCount');
    t.field('startDate', { type: 'DateTime' });
    t.field('endDate', { type: 'DateTime' });
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
  },
});

export default Trip;
