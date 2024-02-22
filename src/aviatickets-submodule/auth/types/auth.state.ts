import { BaseState } from "aviatickets-submodule/libs/types/base.state";

export interface AuthState extends BaseState {
  isAuth: boolean;
  isPending: {
    isAuth: boolean;
  };
  errors: {
    isAuth: string | null;
  };
  name: string;
  id: string;
}
