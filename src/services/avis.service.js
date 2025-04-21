import * as avisRepo from "../repositories/avis.repository.js";

export const createAvis = async (data, sessionId, userId) => {
  return await avisRepo.createAvis(data, sessionId, userId);
};

export const getAllAvis = async () => {
  return await avisRepo.getAllAvis();
};

export const getAvis = async (id) => {
  return await avisRepo.getAvis(id);
};

export const getAvisByFormation = async (formationId) => {
  return await avisRepo.getAvisByFormation(formationId);

};
export const getAvisByUser = async (userId) => {
  return await avisRepo.getAvisByUser(userId);
  
};

export const getAvisBySession = async (sessionId) => {
  return await avisRepo.getAvisBySession(sessionId);
};

export const updateAvis = async (id, data) => {
  return await avisRepo.updateAvis(id, data);
};

export const deleteAvis = async (id) => {
  return await avisRepo.deleteAvis(id);
};





export const getAvisTopRatedBYSession = async (id) => {
  return await avisRepo.findOneById(id);
};



export const getTopRatedFormations = async (limit) => { avisRepo.getTopRatedFormations(limit)};


export const getTopRatedSessions = (limit) => avisRepo.getTopRatedSessions(limit);


