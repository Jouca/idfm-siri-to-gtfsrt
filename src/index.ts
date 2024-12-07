import { Entity, GTFSRealtime, Incrementality } from 'gtfs-types';
import { SiriLite, OutputType, tripsGtfs } from './types';
export function makeGTFSRt<IsProtobuf extends boolean>(siri: SiriLite, gtfs: { trips: Buffer, stop_times: Buffer }, isProtobuf: IsProtobuf): IsProtobuf extends true ? Buffer<ArrayBuffer> : GTFSRealtime {
    const siriData = siri.Siri.ServiceDelivery.EstimatedTimetableDelivery[0].EstimatedJourneyVersionFrame[0].EstimatedVehicleJourney; // foreach last
    const flux: GTFSRealtime = {
        status: "ok",
        response: {
            header: {
                gtfs_realtime_version: "2.0",
                incrementality: Incrementality.FULL_DATASET,
                timestamp: Date.now()
            },
            entity: []
        }
    }
    let currentLine: number[] = []
    for (const b of gtfs.trips) {
        if (b === 10) {
            console.log("New Trip")
            const trip = Buffer.from(currentLine).toString().split(",");
            flux.response.entity?.push(
                {
                    id: crypto.randomUUID().toString(),
                    trip_update: {
                        trip: {
                            route_id: trip[tripsGtfs.routeId],
                            direction_id: Number(trip[tripsGtfs.directionId]),
                            trip_id: trip[tripsGtfs.tripId]
                        },
                        stop_time_update: [

                        ]
                    }

                }
            )
            currentLine = []
        }
        else {
            currentLine.push(b)
        }
    }


    if (isProtobuf) {
        return Buffer.from(JSON.stringify(flux)) as OutputType<IsProtobuf>;
    }
    else {
        return flux as OutputType<IsProtobuf>;
    }

}

/* entity: siriData.EstimatedCalls.EstimatedCall.map((i): Entity => {
    return {
        id: crypto.randomUUID().toString(),
        trip_update: {
            trip: {
                route_id: "IDFM:" + siriData.LineRef.value.match(/STIF:Line::(.\S+):/)![1],
                direction_id: 0 // WIP, how can we get direction_id ?
                
            },
            timestamp: new Date(siriData.RecordedAtTime).getTime(),

        }
    }
}) 
            const tripId = Buffer.from(trip[tripsGtfs.tripId])
            let get = false;
            let getPos = 0;
            for (const [i, s] of gtfs.stop_times.entries()) {
                if (gtfs.stop_times[i - 1] === 10) {
                    if(gtfs.stop_times.subarray(i, i + tripId.length) === tripId) {
                        console.log("equal")
                        get = true;
                        getPos = i;
                    }
                }
            }    
*/