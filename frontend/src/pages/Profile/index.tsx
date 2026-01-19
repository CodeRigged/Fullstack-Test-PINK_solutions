import { useIntl } from "react-intl"
import PageLayout from "~/layouts/PageLayout"

const ProfilePage = () => {
  const { formatMessage } = useIntl()
  return (
    <PageLayout documentTitle={formatMessage({ id: "pages.profile.title", defaultMessage: "Profile" })}>
      TODO
    </PageLayout>
  )
}
export default ProfilePage
