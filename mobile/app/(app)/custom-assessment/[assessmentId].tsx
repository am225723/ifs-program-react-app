import { useLocalSearchParams } from 'expo-router';
import { FeaturePlaceholder } from '../../../src/components/FeaturePlaceholder';

export default function CustomAssessmentScreen() {
  const { assessmentId } = useLocalSearchParams<{ assessmentId: string }>();

  return (
    <FeaturePlaceholder
      title={`Custom Assessment: ${assessmentId || 'Unknown'}`}
      description="Dynamic custom assessment route is wired and ready for questionnaire rendering migration."
    />
  );
}
