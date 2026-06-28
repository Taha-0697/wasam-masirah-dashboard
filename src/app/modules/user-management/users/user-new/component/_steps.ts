import { APIData, User, UserRequest } from '../../core/_models';

export type StepProps = {
  data: UserRequest;
  APIData: APIData;
  setData: (data: UserRequest) => void;
  updateData: (fieldsToUpdate: Partial<User>) => void;
  btnRef: React.RefObject<HTMLButtonElement>;
};

export type StepperItem = {
  title: string;
  description?: string;
};

export const stepperItems: StepperItem[] = [
  { title: 'Basic', description: 'Basic Information' },
  { title: 'Roles', description: 'Roles Mapping' },
  { title: 'Finalize', description: 'Proof Reading' },
];
