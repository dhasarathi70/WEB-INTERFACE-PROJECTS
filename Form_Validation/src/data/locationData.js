const locationData = [
  {
    state: "Tamil Nadu",
    district: "Chengalpattu",
    cities: [
      { city: "Pallavaram", pincodes: ["600043"] },
      { city: "Pallikaranai", pincodes: ["600100"] },
      { city: "Tambaram", pincodes: ["600045", "600059"] },
      { city: "Chromepet", pincodes: ["600044"] }
    ]
  },
  {
    state: "Tamil Nadu",
    district: "Chennai",
    cities: [
      { city: "Adyar", pincodes: ["600020"] },
      { city: "Anna Nagar", pincodes: ["600040"] },
      { city: "T Nagar", pincodes: ["600017"] },
      { city: "Velachery", pincodes: ["600042"] }
    ]
  },
  {
    state: "Tamil Nadu",
    district: "Coimbatore",
    cities: [
      { city: "Coimbatore", pincodes: ["641001"] },
      { city: "Pollachi", pincodes: ["642001"] },
      { city: "Mettupalayam", pincodes: ["641301"] }
    ]
  },
  {
    state: "Karnataka",
    district: "Bengaluru Urban",
    cities: [
      { city: "Bengaluru", pincodes: ["560001"] },
      { city: "Whitefield", pincodes: ["560066"] },
      { city: "Yelahanka", pincodes: ["560064"] }
    ]
  },
  {
    state: "Kerala",
    district: "Ernakulam",
    cities: [
      { city: "Kochi", pincodes: ["682001"] },
      { city: "Aluva", pincodes: ["683101"] }
    ]
  },
  {
    state: "Maharashtra",
    district: "Mumbai Suburban",
    cities: [
      { city: "Andheri", pincodes: ["400053"] },
      { city: "Bandra", pincodes: ["400050"] }
    ]
  }
];

export function getStates() {
  return [...new Set(locationData.map((item) => item.state))];
}

export function getDistricts(state) {
  return [
    ...new Set(
      locationData
        .filter((item) => item.state === state)
        .map((item) => item.district)
    )
  ];
}

export function getCities(state, district) {
  return locationData
    .filter((item) => item.state === state && item.district === district)
    .flatMap((item) => item.cities.map((entry) => entry.city));
}

export function getCity(state, district, city) {
  const districtRecord = locationData.find(
    (item) => item.state === state && item.district === district
  );

  return districtRecord?.cities.find((entry) => entry.city === city) ?? null;
}

export function findByPincode(pincode) {
  const normalizedPincode = String(pincode ?? "").trim();

  // Must contain exactly 6 numeric digits
  if (!/^\d{6}$/.test(normalizedPincode)) {
    return null;
  }

  for (const districtRecord of locationData) {
    for (const cityRecord of districtRecord.cities) {
      const matchedPincode = cityRecord.pincodes.find(
        (item) => item === normalizedPincode
      );

      if (matchedPincode) {
        return {
          state: districtRecord.state,
          district: districtRecord.district,
          city: cityRecord.city,
          pincode: matchedPincode
        };
      }
    }
  }

  // IMPORTANT:
  // A 6-digit number alone is NOT considered valid.
  // It must exist in the local pincode database.
  return null;
}

export function searchCities(state, district, query) {
  const cities = getCities(state, district);
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return cities;
  }

  return cities.filter((city) => city.toLowerCase().includes(normalizedQuery));
}

export function validateLocation(state, district, city, pincode) {
  if (!state || !district || !city || !pincode) {
    return { valid: false, message: "Complete all location fields." };
  }

  const detected = findByPincode(pincode);

  if (!detected) {
    return { valid: false, message: "Pincode was not found in the local demo dataset." };
  }

  if (detected.state !== state) {
    return { valid: false, message: "Pincode does not match the selected state." };
  }

  if (detected.district !== district) {
    return { valid: false, message: "Pincode does not match the selected district." };
  }

  if (detected.city !== city) {
    return { valid: false, message: "Pincode does not match the selected city." };
  }

  return { valid: true, message: "Location is consistent." };
}

export default locationData;