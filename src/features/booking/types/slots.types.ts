export interface SlotItem {
  start: string;
  end: string;
}

export interface SlotsResponse {
  availableIntervals: SlotItem[];
}
