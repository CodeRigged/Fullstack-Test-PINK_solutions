import { AccountCircle, Logout, Settings } from "@mui/icons-material"
import { Divider, IconButton } from "@mui/material"
import { FormattedMessage } from "react-intl"
import { useFhirStore } from "~/stores/fhirStore"
import AppMenu from "../Menu"
import { MenuListItem } from "../Menu/MenuItems"

/**
 * Renders an account menu component.
 *
 * @todo Change to desired Menu Items
 *
 * @return {JSX.Element} The rendered account menu component.
 */
const AccountMenu = () => {
  const { isAuthenticated } = useFhirStore()

  return (
    <AppMenu
      Activator={({ onClick }) => (
        <IconButton onClick={onClick} sx={{ ml: 2 }} aria-haspopup="true">
          <AccountCircle />
        </IconButton>
      )}
      items={[
        <MenuListItem
          icon={<AccountCircle />}
          text={<FormattedMessage id="pages.profile.title" defaultMessage="Profile" />}
          to="/profile"
        />,
        <Divider />,
        <MenuListItem
          dense
          icon={<Settings fontSize="small" />}
          text={<FormattedMessage id="pages.settings.title" defaultMessage="Settings" />}
          to="/settings"
        />,
        isAuthenticated ? (
          <MenuListItem
            dense
            icon={<Logout fontSize="small" />}
            text={<FormattedMessage id="pages.logout.title" defaultMessage="Logout" />}
            to="/logout"
          />
        ) : (
          <MenuListItem
            dense
            icon={<AccountCircle fontSize="small" />}
            text={<FormattedMessage id="pages.login.title" defaultMessage="Login" />}
            to="/login"
          />
        ),
      ]}
    />
  )
}
export default AccountMenu
