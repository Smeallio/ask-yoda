export interface ResponseProps {
  yodaResponseText: string;
  setResponseData: (value: string | null) => void;
  setLoading: (value: boolean) => void;
}
