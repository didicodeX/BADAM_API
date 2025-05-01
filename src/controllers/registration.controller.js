import * as RegistrationService from "../services/registration.service.js"

export const createRegistration = async (req, res) => {
  try {
    const userId = req.user.id;
    const sessionId = req.params.sessionId;

    const Registration = await RegistrationService.createRegistration({ userId, sessionId });

    res.status(201).json(Registration);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export const getRegistrations = async (req, res) => {
  try {
    const registrations = await RegistrationService.getRegistrations();
    res.status(201).json(registrations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getRegistrationsByUserId = async (req, res) => {
  try {
    const registrations = await RegistrationService.getRegistrationsByUserId(req.user);
    res.status(200).json(registrations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getRegistrationsBySessionId = async (req, res) => {
  try {
    const registrations = await RegistrationService.getRegistrationsBySessionId(req.params.sessionId);
    res.status(200).json(registrations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteRegistration = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.id; 

    await RegistrationService.deleteRegistration(userId, sessionId);

    res.status(200).json({ message: "Inscription supprimée avec succès" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};