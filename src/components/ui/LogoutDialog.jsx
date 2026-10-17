import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/AuthContext";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function LogoutDialog() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    function handleLogout() {
        logout();
        navigate("/sign-in");
    }
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <button className="bg-red-600 hover:bg-red-500 hover:cursor-pointer text-white px-4 py-1 font-bold rounded">
            Logout
          </button>
        }
      />

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Log out?</AlertDialogTitle>
          <AlertDialogDescription>
            You'll need to sign in again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay signed in</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Log out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
