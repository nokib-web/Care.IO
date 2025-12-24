"use client";

import { createBooking } from "@/actions/server/bookings";
import { useState } from "react";
import { useRouter } from "next/navigation";
import serviceCenterData from "@/data/serviceCenter.json";

const BookingForm = ({ service, user }) => {
    const router = useRouter();
    const [duration, setDuration] = useState(1);
    const [division, setDivision] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");

    // Calculate total cost dynamically
    const totalCost = (service.price.amount * duration).toFixed(2);

    // Get available districts based on division
    const availableDistricts = serviceCenterData.filter(item => item.region === division);

    // Get available areas/city based on district
    // Assuming 1 entry per district in JSON for simplicity based on previous view, 
    // but filter returns array, so we take the first match or map.
    const selectedLocationData = serviceCenterData.find(item => item.district === district);



    const handleSubmit = async (formData) => {
        // Append calculated/hidden values if not directly in inputs, 
        // but server action reads from formData.
        // We ensure inputs have correct 'name' attributes matching server action.

        const result = await createBooking(formData);

        if (result.success) {
            router.push("/my-bookings");
        } else {
            alert(result.message);
        }
    };

    return (
        <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Book {service.serviceName}</h2>

                <form action={handleSubmit} className="space-y-4">
                    {/* Hidden Fields for Service Info */}
                    <input type="hidden" name="serviceId" value={service._id} />
                    <input type="hidden" name="serviceName" value={service.serviceName} />
                    <input type="hidden" name="priceAmount" value={service.price.amount} />

                    {/* Explicitly passing city and area as hidden if they are state-controlled but need to be in formData 
                        OR ensuring they are in select/inputs with names. 
                        Since 'city' might be read-only/auto-set, we can make it a readonly input.
                    */}

                    {/* User Info Read-only */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Name</span></label>
                            <input type="text" value={user?.name || ''} className="input input-bordered" disabled />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input type="text" value={user?.email || ''} className="input input-bordered" disabled />
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Date</span></label> <br />
                        <input name="date" type="date" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text">Duration (Hours)</span></label> <br />
                        <input
                            name="duration"
                            type="number"
                            min="1"
                            max="24"
                            value={duration}
                            onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                            className="input input-bordered"
                            required
                        />
                    </div>

                    {/* Address Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Division</span></label>
                            <select
                                name="division"
                                className="select select-bordered"
                                required
                                onChange={(e) => {
                                    setDivision(e.target.value);
                                    setDistrict("");
                                    setCity("");
                                    setArea("");
                                }}
                                value={division}
                            >
                                <option disabled value="">Select Division</option>
                                {[...new Set(serviceCenterData.map(item => item.region))].map(region => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">District</span></label>
                            <select
                                name="district"
                                className="select select-bordered"
                                required
                                disabled={!division}
                                value={district}
                                onChange={(e) => {
                                    const newDistrict = e.target.value;
                                    setDistrict(newDistrict);
                                    setArea("");
                                    const loc = serviceCenterData.find(item => item.district === newDistrict);
                                    if (loc) setCity(loc.city);
                                    else setCity("");
                                }}
                            >
                                <option disabled value="">Select District</option>
                                {availableDistricts.map(item => (
                                    <option key={item.district} value={item.district}>{item.district}</option>
                                ))
                                }
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">City</span></label>
                            <input
                                name="city"
                                type="text"
                                className="input input-bordered"
                                value={city}
                                readOnly
                                placeholder="Auto-selected"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Area</span></label>
                            <select
                                name="area"
                                className="select select-bordered"
                                required
                                disabled={!district}
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                            >
                                <option disabled value="">Select Area</option>
                                {selectedLocationData?.covered_area?.map(areaName => (
                                    <option key={areaName} value={areaName}>{areaName}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text">Exact Address</span></label> <br />
                        <textarea name="address" placeholder="House no, Road no, etc." className="textarea textarea-bordered h-24" required></textarea>
                    </div>

                    {/* Summary */}
                    <div className="divider"></div>
                    <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Cost:</span>
                        <span className="text-primary">${totalCost}</span>
                    </div>

                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">Confirm Booking</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;
