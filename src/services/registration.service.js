import * as RegistrationRepo from "../repositories/registration.repository.js"

export const createRegistration = async(data) =>{
    return await RegistrationRepo.createRegistration(data);
}

export const getRegistrations = async () => {
  return await RegistrationRepo.getRegistrations();
};

export const getRegistrationsByUserId = async (userId) => {
  return await RegistrationRepo.getRegistrationsByUserId(userId);
};

export const getRegistrationsBySessionId = async (sessionId) => {
  return await RegistrationRepo.getRegistrationsBySessionId(sessionId);
};

export const deleteRegistration = async (id) => {
  return await RegistrationRepo.deleteRegistration(id);
};


