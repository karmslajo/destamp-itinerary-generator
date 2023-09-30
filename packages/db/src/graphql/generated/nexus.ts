/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import type { core } from 'nexus';
import type { ValidateResolver } from 'nexus-validate';

import type { Context } from './../context';

declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>,
    ): void; // "DateTime";
    /**
     * The `BigInt` scalar type represents non-fractional signed whole numeric values.
     */
    bigInt<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>,
    ): void; // "BigInt";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void; // "DateTime";
    /**
     * The `BigInt` scalar type represents non-fractional signed whole numeric values.
     */
    bigInt<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void; // "BigInt";
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreateDepartingLocationInput: {
    // input type
    address: string; // String!
    latitude: number; // Float!
    longitude: number; // Float!
    name: string; // String!
  };
  CreateExpenseInput: {
    // input type
    amount: number; // Float!
    category: NexusGenEnums['ExpenseCategory']; // ExpenseCategory!
    date: NexusGenScalars['DateTime']; // DateTime!
    itineraryId: number; // Int!
    note?: string | null; // String
  };
  CreateTripInput: {
    // input type
    adultCount?: number | null; // Int
    budget: number; // Float!
    childCount?: number | null; // Int
    destinationId: number; // Int!
    endDate: NexusGenScalars['DateTime']; // DateTime!
    isAccommodationIncluded: boolean; // Boolean!
    isFoodIncluded: boolean; // Boolean!
    isTransportationIncluded: boolean; // Boolean!
    startDate: NexusGenScalars['DateTime']; // DateTime!
    title: string; // String!
    travelSize: NexusGenEnums['TravelSize']; // TravelSize!
    travelerId: number; // Int!
  };
  CreateUserInput: {
    // input type
    email: string; // String!
    id: string; // String!
    password: string; // String!
    userType: NexusGenEnums['UserType']; // UserType!
  };
}

export interface NexusGenEnums {
  BusinessRole: 'MANAGER' | 'OWNER';
  ExpenseCategory:
    | 'ACCOMMODATION'
    | 'ACTIVITY'
    | 'FOOD'
    | 'OTHER'
    | 'SHOPPING'
    | 'SIGHTSEEING'
    | 'TRANSPORTATION';
  PlaceType: 'ACCOMMODATION' | 'ATTRACTION' | 'RESTAURANT';
  TravelSize: 'COUPLE' | 'FAMILY' | 'GROUP' | 'SOLO';
  UserType: 'BUSINESS_OPERATOR' | 'TRAVELER';
}

export interface NexusGenScalars {
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  BigInt: any;
  DateTime: any;
}

export interface NexusGenObjects {
  Amenity: {
    // root type
    id: number; // Int!
    name: string; // String!
  };
  BusinessOwner: {
    // root type
    firstName: string; // String!
    id: number; // Int!
    lastName: string; // String!
    role: NexusGenEnums['BusinessRole']; // BusinessRole!
  };
  Category: {
    // root type
    id: number; // Int!
    name: string; // String!
  };
  DailyItinerary: {
    // root type
    accommodationCost: number; // Float!
    attractionCost: number; // Float!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    dayIndex: number; // Int!
    foodCost: string; // String!
    id: number; // Int!
    transportationCost: number; // Float!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  };
  DepartingLocation: {
    // root type
    address: string; // String!
    id: number; // Int!
    latitude: number; // Float!
    longitude: number; // Float!
    name: string; // String!
  };
  Destination: {
    // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  };
  DiningAtmosphere: {
    // root type
    id: number; // Int!
    name: string; // String!
  };
  DiningCuisine: {
    // root type
    id: number; // Int!
    name: string; // String!
  };
  DiningOffering: {
    // root type
    id: number; // Int!
    name: string; // String!
  };
  DiningOption: {
    // root type
    id: number; // Int!
    name: string; // String!
  };
  Expense: {
    // root type
    amount: number; // Float!
    category: NexusGenEnums['ExpenseCategory']; // ExpenseCategory!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    date: NexusGenScalars['DateTime']; // DateTime!
    note?: string | null; // String
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  };
  Image: {
    // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    name?: string | null; // String
    size?: number | null; // Int
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    url: string; // String!
  };
  Itinerary: {
    // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    totalCost: number; // Float!
    totalDuration: number; // Float!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    url: string; // String!
  };
  Mutation: {};
  OpeningHour: {
    // root type
    closeTime: NexusGenScalars['DateTime']; // DateTime!
    day: number; // Int!
    id: number; // Int!
    openTime: NexusGenScalars['DateTime']; // DateTime!
  };
  Place: {
    // root type
    address: string; // String!
    contactNumber?: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description?: string | null; // String
    id: string; // String!
    latitude: number; // Float!
    longitude: number; // Float!
    name: string; // String!
    price: string; // String!
    type: NexusGenEnums['PlaceType']; // PlaceType!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    url?: string | null; // String
    visitDuration: number; // Float!
    website?: string | null; // String
  };
  Query: {};
  Traveler: {
    // root type
    contactNumber?: string | null; // String
    firstName?: string | null; // String
    id: number; // Int!
    lastName?: string | null; // String
  };
  Trip: {
    // root type
    adultCount?: number | null; // Int
    budget: number; // Float!
    childCount?: number | null; // Int
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    endDate: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    isAccommodationIncluded: boolean; // Boolean!
    isFoodIncluded: boolean; // Boolean!
    isTransportationIncluded: boolean; // Boolean!
    startDate: NexusGenScalars['DateTime']; // DateTime!
    title: string; // String!
    travelSize: NexusGenEnums['TravelSize']; // TravelSize!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  };
  User: {
    // root type
    email: string; // String!
    id: string; // String!
    password: string; // String!
    userType: NexusGenEnums['UserType']; // UserType!
  };
}

export interface NexusGenInterfaces {}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenObjects;

export type NexusGenAllTypes = NexusGenRootTypes &
  NexusGenScalars &
  NexusGenEnums;

export interface NexusGenFieldTypes {
  Amenity: {
    // field return type
    id: number; // Int!
    name: string; // String!
  };
  BusinessOwner: {
    // field return type
    firstName: string; // String!
    id: number; // Int!
    lastName: string; // String!
    listings: NexusGenRootTypes['Place'][]; // [Place!]!
    role: NexusGenEnums['BusinessRole']; // BusinessRole!
  };
  Category: {
    // field return type
    id: number; // Int!
    name: string; // String!
  };
  DailyItinerary: {
    // field return type
    accommodationCost: number; // Float!
    attractionCost: number; // Float!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    dayIndex: number; // Int!
    destinations: NexusGenRootTypes['Place'][]; // [Place!]!
    foodCost: string; // String!
    id: number; // Int!
    transportationCost: number; // Float!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  };
  DepartingLocation: {
    // field return type
    address: string; // String!
    id: number; // Int!
    latitude: number; // Float!
    longitude: number; // Float!
    name: string; // String!
  };
  Destination: {
    // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    image: NexusGenRootTypes['Image'] | null; // Image
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  };
  DiningAtmosphere: {
    // field return type
    id: number; // Int!
    name: string; // String!
  };
  DiningCuisine: {
    // field return type
    id: number; // Int!
    name: string; // String!
  };
  DiningOffering: {
    // field return type
    id: number; // Int!
    name: string; // String!
  };
  DiningOption: {
    // field return type
    id: number; // Int!
    name: string; // String!
  };
  Expense: {
    // field return type
    amount: number; // Float!
    category: NexusGenEnums['ExpenseCategory']; // ExpenseCategory!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    date: NexusGenScalars['DateTime']; // DateTime!
    note: string | null; // String
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  };
  Image: {
    // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    name: string | null; // String
    size: number | null; // Int
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    url: string; // String!
  };
  Itinerary: {
    // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    dailyItineraries: NexusGenRootTypes['DailyItinerary'][]; // [DailyItinerary!]!
    expenses: NexusGenRootTypes['Expense'][]; // [Expense!]!
    id: number; // Int!
    totalCost: number; // Float!
    totalDuration: number; // Float!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    url: string; // String!
  };
  Mutation: {
    // field return type
    createExpense: NexusGenRootTypes['Expense']; // Expense!
    createTrip: NexusGenRootTypes['Trip']; // Trip!
    createUser: NexusGenRootTypes['User']; // User!
    deleteTrip: NexusGenRootTypes['Trip']; // Trip!
  };
  OpeningHour: {
    // field return type
    closeTime: NexusGenScalars['DateTime']; // DateTime!
    day: number; // Int!
    id: number; // Int!
    openTime: NexusGenScalars['DateTime']; // DateTime!
  };
  Place: {
    // field return type
    address: string; // String!
    amenities: NexusGenRootTypes['Amenity'][]; // [Amenity!]!
    categories: NexusGenRootTypes['Category'][]; // [Category!]!
    contactNumber: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string | null; // String
    diningAtmospheres: NexusGenRootTypes['DiningAtmosphere'][]; // [DiningAtmosphere!]!
    diningCuisines: NexusGenRootTypes['DiningCuisine'][]; // [DiningCuisine!]!
    diningOfferings: NexusGenRootTypes['DiningOffering'][]; // [DiningOffering!]!
    diningOptions: NexusGenRootTypes['DiningOption'][]; // [DiningOption!]!
    id: string; // String!
    images: NexusGenRootTypes['Image'][]; // [Image!]!
    latitude: number; // Float!
    longitude: number; // Float!
    name: string; // String!
    openingHours: NexusGenRootTypes['OpeningHour'][]; // [OpeningHour!]!
    price: string; // String!
    type: NexusGenEnums['PlaceType']; // PlaceType!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    url: string | null; // String
    visitDuration: number; // Float!
    website: string | null; // String
  };
  Query: {
    // field return type
    destinations: NexusGenRootTypes['Destination'][]; // [Destination!]!
    getTransaction: NexusGenRootTypes['Expense'][]; // [Expense!]!
    itinerary: NexusGenRootTypes['Itinerary']; // Itinerary!
    place: NexusGenRootTypes['Place']; // Place!
    places: NexusGenRootTypes['Place'][]; // [Place!]!
    traveler: NexusGenRootTypes['Traveler']; // Traveler!
    travelerTrips: NexusGenRootTypes['Trip'][]; // [Trip!]!
    trip: NexusGenRootTypes['Trip']; // Trip!
  };
  Traveler: {
    // field return type
    contactNumber: string | null; // String
    firstName: string | null; // String
    id: number; // Int!
    lastName: string | null; // String
    trips: NexusGenRootTypes['Trip'][]; // [Trip!]!
  };
  Trip: {
    // field return type
    adultCount: number | null; // Int
    budget: number; // Float!
    childCount: number | null; // Int
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    departingLocation: NexusGenRootTypes['DepartingLocation'] | null; // DepartingLocation
    destination: NexusGenRootTypes['Destination'] | null; // Destination
    endDate: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    isAccommodationIncluded: boolean; // Boolean!
    isFoodIncluded: boolean; // Boolean!
    isTransportationIncluded: boolean; // Boolean!
    itinerary: NexusGenRootTypes['Itinerary'] | null; // Itinerary
    startDate: NexusGenScalars['DateTime']; // DateTime!
    title: string; // String!
    travelSize: NexusGenEnums['TravelSize']; // TravelSize!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  };
  User: {
    // field return type
    email: string; // String!
    id: string; // String!
    password: string; // String!
    traveler: NexusGenRootTypes['Traveler'] | null; // Traveler
    userType: NexusGenEnums['UserType']; // UserType!
  };
}

export interface NexusGenFieldTypeNames {
  Amenity: {
    // field return type name
    id: 'Int';
    name: 'String';
  };
  BusinessOwner: {
    // field return type name
    firstName: 'String';
    id: 'Int';
    lastName: 'String';
    listings: 'Place';
    role: 'BusinessRole';
  };
  Category: {
    // field return type name
    id: 'Int';
    name: 'String';
  };
  DailyItinerary: {
    // field return type name
    accommodationCost: 'Float';
    attractionCost: 'Float';
    createdAt: 'DateTime';
    dayIndex: 'Int';
    destinations: 'Place';
    foodCost: 'String';
    id: 'Int';
    transportationCost: 'Float';
    updatedAt: 'DateTime';
  };
  DepartingLocation: {
    // field return type name
    address: 'String';
    id: 'Int';
    latitude: 'Float';
    longitude: 'Float';
    name: 'String';
  };
  Destination: {
    // field return type name
    createdAt: 'DateTime';
    id: 'Int';
    image: 'Image';
    name: 'String';
    updatedAt: 'DateTime';
  };
  DiningAtmosphere: {
    // field return type name
    id: 'Int';
    name: 'String';
  };
  DiningCuisine: {
    // field return type name
    id: 'Int';
    name: 'String';
  };
  DiningOffering: {
    // field return type name
    id: 'Int';
    name: 'String';
  };
  DiningOption: {
    // field return type name
    id: 'Int';
    name: 'String';
  };
  Expense: {
    // field return type name
    amount: 'Float';
    category: 'ExpenseCategory';
    createdAt: 'DateTime';
    date: 'DateTime';
    note: 'String';
    updatedAt: 'DateTime';
  };
  Image: {
    // field return type name
    createdAt: 'DateTime';
    id: 'ID';
    name: 'String';
    size: 'Int';
    updatedAt: 'DateTime';
    url: 'String';
  };
  Itinerary: {
    // field return type name
    createdAt: 'DateTime';
    dailyItineraries: 'DailyItinerary';
    expenses: 'Expense';
    id: 'Int';
    totalCost: 'Float';
    totalDuration: 'Float';
    updatedAt: 'DateTime';
    url: 'String';
  };
  Mutation: {
    // field return type name
    createExpense: 'Expense';
    createTrip: 'Trip';
    createUser: 'User';
    deleteTrip: 'Trip';
  };
  OpeningHour: {
    // field return type name
    closeTime: 'DateTime';
    day: 'Int';
    id: 'Int';
    openTime: 'DateTime';
  };
  Place: {
    // field return type name
    address: 'String';
    amenities: 'Amenity';
    categories: 'Category';
    contactNumber: 'String';
    createdAt: 'DateTime';
    description: 'String';
    diningAtmospheres: 'DiningAtmosphere';
    diningCuisines: 'DiningCuisine';
    diningOfferings: 'DiningOffering';
    diningOptions: 'DiningOption';
    id: 'String';
    images: 'Image';
    latitude: 'Float';
    longitude: 'Float';
    name: 'String';
    openingHours: 'OpeningHour';
    price: 'String';
    type: 'PlaceType';
    updatedAt: 'DateTime';
    url: 'String';
    visitDuration: 'Float';
    website: 'String';
  };
  Query: {
    // field return type name
    destinations: 'Destination';
    getTransaction: 'Expense';
    itinerary: 'Itinerary';
    place: 'Place';
    places: 'Place';
    traveler: 'Traveler';
    travelerTrips: 'Trip';
    trip: 'Trip';
  };
  Traveler: {
    // field return type name
    contactNumber: 'String';
    firstName: 'String';
    id: 'Int';
    lastName: 'String';
    trips: 'Trip';
  };
  Trip: {
    // field return type name
    adultCount: 'Int';
    budget: 'Float';
    childCount: 'Int';
    createdAt: 'DateTime';
    departingLocation: 'DepartingLocation';
    destination: 'Destination';
    endDate: 'DateTime';
    id: 'Int';
    isAccommodationIncluded: 'Boolean';
    isFoodIncluded: 'Boolean';
    isTransportationIncluded: 'Boolean';
    itinerary: 'Itinerary';
    startDate: 'DateTime';
    title: 'String';
    travelSize: 'TravelSize';
    updatedAt: 'DateTime';
  };
  User: {
    // field return type name
    email: 'String';
    id: 'String';
    password: 'String';
    traveler: 'Traveler';
    userType: 'UserType';
  };
}

export interface NexusGenArgTypes {
  Mutation: {
    createExpense: {
      // args
      data: NexusGenInputs['CreateExpenseInput']; // CreateExpenseInput!
    };
    createTrip: {
      // args
      data: NexusGenInputs['CreateTripInput']; // CreateTripInput!
      locationData: NexusGenInputs['CreateDepartingLocationInput']; // CreateDepartingLocationInput!
    };
    createUser: {
      // args
      data: NexusGenInputs['CreateUserInput']; // CreateUserInput!
    };
    deleteTrip: {
      // args
      id: number; // Int!
    };
  };
  Query: {
    getTransaction: {
      // args
      itineraryId: number; // Int!
    };
    itinerary: {
      // args
      tripId: number; // Int!
    };
    place: {
      // args
      placeId: string; // String!
    };
    traveler: {
      // args
      userId: string; // String!
    };
    travelerTrips: {
      // args
      userId: string; // String!
    };
    trip: {
      // args
      id: number; // Int!
    };
  };
}

export interface NexusGenAbstractTypeMembers {}

export interface NexusGenTypeInterfaces {}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false;
    resolveType: true;
    __typename: false;
  };
};

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes:
    | NexusGenTypes['inputNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['scalarNames'];
  allOutputTypes:
    | NexusGenTypes['objectNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['unionNames']
    | NexusGenTypes['interfaceNames']
    | NexusGenTypes['scalarNames'];
  allNamedTypes:
    | NexusGenTypes['allInputTypes']
    | NexusGenTypes['allOutputTypes'];
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<
    TypeName extends string,
    FieldName extends string,
  > {
    /**
     * Validate mutation arguments.
     */
    validate?: ValidateResolver<TypeName, FieldName>;
  }
  interface NexusGenPluginInputFieldConfig<
    TypeName extends string,
    FieldName extends string,
  > {}
  interface NexusGenPluginSchemaConfig {}
  interface NexusGenPluginArgConfig {}
}
