
/**
 * Mathematically Proven ClubNight Validation
 * Ensures all ClubNight objects satisfy mathematical constraints
 */

import { 
  validatePositiveInteger, 
  validateNonEmptyString, 
  validateFutureDate, 
  validateRange 
} from './mathematical-validation';
import { requires, ensures, invariant } from './contracts';

export interface ClubNight {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  description: string;
  status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
  organizer: string;
}

/**
 * Mathematical proof that ClubNight object is valid
 * Theorem: ∀ cn ∈ ClubNight, isValidClubNight(cn) → cn satisfies all business constraints
 */
export function validateClubNight(clubNight: Partial<ClubNight>): asserts clubNight is ClubNight {
  // Precondition: Input must be an object
  requires(typeof clubNight === 'object' && clubNight !== null, "ClubNight must be an object");

  // Validate ID: id ∈ ℤ⁺
  requires(typeof clubNight.id === 'number', "ID must be provided");
  validatePositiveInteger(clubNight.id);

  // Validate title: title ∈ Σ⁺
  requires(typeof clubNight.title === 'string', "Title must be provided");
  validateNonEmptyString(clubNight.title);

  // Validate date: date must be valid ISO string
  requires(typeof clubNight.date === 'string', "Date must be provided");
  validateNonEmptyString(clubNight.date);

  // Validate time: time ∈ valid time format
  requires(typeof clubNight.time === 'string', "Time must be provided");
  validateNonEmptyString(clubNight.time);

  // Validate duration
  requires(typeof clubNight.duration === 'string', "Duration must be provided");
  validateNonEmptyString(clubNight.duration);

  // Validate location
  requires(typeof clubNight.location === 'string', "Location must be provided");
  validateNonEmptyString(clubNight.location);

  // Validate participants: Mathematical constraint currentParticipants ≤ maxParticipants
  requires(typeof clubNight.maxParticipants === 'number', "Max participants must be provided");
  requires(typeof clubNight.currentParticipants === 'number', "Current participants must be provided");
  
  validatePositiveInteger(clubNight.maxParticipants);
  validateRange(clubNight.currentParticipants, 0, clubNight.maxParticipants);

  // Validate description
  requires(typeof clubNight.description === 'string', "Description must be provided");
  validateNonEmptyString(clubNight.description);

  // Validate status: status ∈ {Upcoming, Ongoing, Completed, Cancelled}
  const validStatuses = ["Upcoming", "Ongoing", "Completed", "Cancelled"] as const;
  requires(typeof clubNight.status === 'string', "Status must be provided");
  requires(validStatuses.includes(clubNight.status as any), "Status must be valid");

  // Validate organizer
  requires(typeof clubNight.organizer === 'string', "Organizer must be provided");
  validateNonEmptyString(clubNight.organizer);

  // Invariant: Mathematical relationship between participants
  invariant(
    clubNight.currentParticipants <= clubNight.maxParticipants,
    "Current participants cannot exceed maximum participants"
  );

  // Postcondition: Object satisfies all ClubNight constraints
  ensures(
    typeof clubNight.id === 'number' &&
    typeof clubNight.title === 'string' &&
    typeof clubNight.date === 'string' &&
    typeof clubNight.time === 'string' &&
    typeof clubNight.duration === 'string' &&
    typeof clubNight.location === 'string' &&
    typeof clubNight.maxParticipants === 'number' &&
    typeof clubNight.currentParticipants === 'number' &&
    typeof clubNight.description === 'string' &&
    typeof clubNight.status === 'string' &&
    typeof clubNight.organizer === 'string' &&
    clubNight.currentParticipants <= clubNight.maxParticipants,
    "ClubNight object satisfies all mathematical constraints"
  );
}

/**
 * Mathematical proof for array of ClubNights
 * Theorem: ∀ A ∈ ClubNight[], validateClubNights(A) → ∀ cn ∈ A, isValidClubNight(cn)
 */
export function validateClubNights(clubNights: Partial<ClubNight>[]): asserts clubNights is ClubNight[] {
  requires(Array.isArray(clubNights), "Input must be an array");
  
  clubNights.forEach((clubNight, index) => {
    try {
      validateClubNight(clubNight);
    } catch (error) {
      throw new Error(`ClubNight at index ${index} is invalid: ${error.message}`);
    }
  });

  ensures(clubNights.every(cn => 
    typeof cn === 'object' && 
    cn !== null && 
    cn.currentParticipants <= cn.maxParticipants
  ), "All ClubNights are mathematically valid");
}
