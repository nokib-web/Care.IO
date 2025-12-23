"use server";

import { dbconnect } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";

export const getServices = async () => {
    try {
        const db = await dbconnect();
        const servicesCollection = db.collection("services");

        const rawServices = await servicesCollection.find().toArray();

        // Serialize data
        const services = rawServices.map((service) => ({
            ...JSON.parse(JSON.stringify(service)),
            _id: service._id.toString(),
        }));

        return services;
    } catch (error) {
        console.error("Failed to fetch services:", error);
        return [];
    }
};

export const getServiceById = async (id) => {
    try {
        const db = await dbconnect();
        const servicesCollection = db.collection("services");

        let query;
        if (ObjectId.isValid(id)) {
            query = { _id: new ObjectId(id) };
        } else {
            query = { _id: id };
        }
        const rawService = await servicesCollection.findOne(query);

        if (!rawService) return null;

        // Serialize data
        const service = {
            ...JSON.parse(JSON.stringify(rawService)),
            _id: rawService._id.toString(),
        };

        return service;
    } catch (error) {
        console.error(`Failed to fetch service with id ${id}:`, error);
        return null;
    }
};
