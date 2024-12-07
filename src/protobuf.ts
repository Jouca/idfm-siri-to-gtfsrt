import protobuf from 'protobufjs';
import path from 'node:path';
import { TripUpdate } from 'gtfs-types';
export async function generateProtobuf(payload: TripUpdate) {
    try {
        const root = await protobuf.load(path.join(import.meta.dir, "..", "google_transit", "gtfs-realtime", "proto", "gtfs-realtime.proto"))

        const tripUpdate = root.lookupType("transit_realtime.TripUpdate");
        const data = tripUpdate.create(payload)
        const buffer = tripUpdate.encode(payload).finish();

        return buffer;
    }
    catch (e) {
        console.error(e)
    }
}

