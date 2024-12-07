import { GTFSRealtime } from "gtfs-types"

// Siri Lite

type EmptyObject = {}
type StringValueInObject = {
    value: string
}

export interface SiriLite {
    Siri: { ServiceDelivery: ServiceDelivery }
}

export interface ServiceDelivery {
    ResponseTimestamp: Date
    ProducerRef: string
    ResponseMessageIdentifier: string
    EstimatedTimetableDelivery: EstimatedTimetableDelivery[]
}

export interface EstimatedTimetableDelivery {
    ResponseTimestamp: Date
    Version: string
    Status: string
    EstimatedJourneyVersionFrame: Array<{ EstimatedVehicleJourney: EstimatedVehicleJourney[] }>
}

export interface EstimatedVehicleJourney {
    RecordedAtTime: string
    LineRef: StringValueInObject,
    DirectionRef?: StringValueInObject
    DatedVehicleJourneyRef: StringValueInObject
    VehicleMode: string[] // p
    VehicleFeatureRef: string[]
    RouteRef: EmptyObject
    PublishedLineName: StringValueInObject[]
    DirectionName: StringValueInObject[]
    OriginRef: EmptyObject
    OriginName: never[]
    DestinationRef: StringValueInObject
    DestinationName: StringValueInObject[]
    OperatorRef: StringValueInObject
    ProductCategoryRef: EmptyObject
    JourneyNote: StringValueInObject[]
    EstimatedCalls: EstimatedCalls
    VehicleJourneyName: StringValueInObject[]
}

export interface EstimatedCalls {
    EstimatedCall: Array<{
        StopPointRef: StringValueInObject
        ExpectedDepartureTime?: Date
        DestinationDisplay: StringValueInObject[]
        ArrivalProximityText?: StringValueInObject
        DepartureStatus?: string // p
        CallNote?: StringValueInObject[]
        ExpectedArrivalTime?: Date
        AimedArrivalTime?: Date
        ArrivalStatus?: string // p
        AimedDepartureTime?: Date
    }>
}


export type OutputType<IsProtobuf extends boolean> = IsProtobuf extends true
    ? Buffer<ArrayBuffer>
    : GTFSRealtime;



// GTFS

export enum tripsGtfs {
    routeId,
    serviceId,
    tripId,
    tripHeadsign,
    tripShortName,
    directionId,
    blockId,
    shapeId,
    wheelchairAccessible,
    bikesAllowed
}

export enum stopTimesGtfs {
    tripId,
    arrivalTime,
    departureTime,
    stopId,
    stopSequence,
    pickupType,
    dropOffType,
    localZoneId,
    stopHeadsign,
    timepoint
}