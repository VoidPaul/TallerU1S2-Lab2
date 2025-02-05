import Pet from "../pet/pet.model.js"
import Appointment from "../appointment/appointment.model.js"
import { parse } from "date-fns"

export const saveAppointment = async (req, res) => {
  try {
    const data = req.body

    const isoDate = new Date(data.date)

    if (isNaN(isoDate.getTime())) {
      return res.status(400).json({
        success: false,
        msg: "Invalid date.",
      })
    }

    const pet = await Pet.findOne({ _id: data.pet })
    if (!pet) {
      return res.status(404).json({
        success: false,
        msg: "Pet not found.",
      })
    }

    const existAppointment = await Appointment.findOne({
      pet: data.pet,
      user: data.user,
      date: {
        $gte: new Date(isoDate).setHours(0, 0, 0, 0),
        $lt: new Date(isoDate).setHours(23, 59, 59, 999),
      },
    })

    if (existAppointment) {
      return res.status(400).json({
        success: false,
        msg: "User and mascot already have an appointment that day.",
      })
    }

    const appointment = new Appointment({ ...data, date: isoDate })
    await appointment.save()

    return res.status(200).json({
      success: true,
      msg: `Appointment scheduled ${data.date}, successfully made.`,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      msg: "Error making appointment.",
      error,
    })
  }
}
