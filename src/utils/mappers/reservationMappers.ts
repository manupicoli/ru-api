import { ReservationDTO } from "../../dtos/reservationDTO";
import { Reservation } from "../../entities/reservation";

export function toReservationDTO(reservation: Reservation): ReservationDTO{
    return {
        id: reservation.id,
        mealTime: reservation.mealTime,
        reservationDate: reservation.reservationDate,
        user: {
            id: reservation.user?.id,
            username: reservation.user?.username,
            email: reservation.user?.email
        }
    };
}

export function toReservationsDTO(reservations: Reservation[]): ReservationDTO[]{
    return reservations.map(reservation => ({
        id: reservation.id,
        mealTime: reservation.mealTime,
        reservationDate: reservation.reservationDate,
        user: {
            id: reservation.user?.id,
            username: reservation.user?.username,
            email: reservation.user?.email
        }
    }));
}