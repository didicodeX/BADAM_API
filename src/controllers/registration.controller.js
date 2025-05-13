import * as registrationService from "../services/registration.service.js";

export const createRegistration = async (req, res) => {
  try {
    const participantId = req.user.id;
    const sessionId = req.params.sessionId;
    const registration = await registrationService.createRegistration(
      sessionId,
      participantId,
    );
    res
      .status(201)
      .json({ registration: registration, message: "Inscription reussie !" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getRegistrations = async (req, res) => {
  try {
    const registrations = await registrationService.getRegistrations();
    res.status(201).json(registrations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getRegistrationsByUserId = async (req, res) => {
  try {
    const registrations = await registrationService.getRegistrationsByUserId(
      req.user.id
    );
    res.status(200).json(registrations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getArchivedRegistrations = async (req, res) => {
  try {
    const registrations = await registrationService.getArchivedRegistrations(
      req.user.id
    );
    res.status(200).json(registrations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getRegistrationsBySessionId = async (req, res) => {
  console.log("ici controller");
  try {
    const registrations = await registrationService.getRegistrationsBySessionId(
      req.params.sessionId
    );
    res.status(200).json(registrations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteRegistration = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const targetUserId = req.query.userId || req.user.id;

    await registrationService.deleteRegistration(targetUserId, sessionId);

    res.status(200).json({ message: "Désinscription réussie" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
