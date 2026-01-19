import { useIntl } from "react-intl"
import PageLayout from "~/layouts/PageLayout"
import FhirPatientsList from "./FhirPatientsList"

const LandingPage = () => {
  const { formatMessage } = useIntl()

  return (
    <PageLayout documentTitle={formatMessage({ id: "pages.landing.title", defaultMessage: "Landing Page" })}>
      <FhirPatientsList />
    </PageLayout>
  )
}
export default LandingPage
