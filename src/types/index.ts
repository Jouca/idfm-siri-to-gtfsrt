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


