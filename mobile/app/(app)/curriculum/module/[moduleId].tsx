import { useLocalSearchParams } from 'expo-router';
import { FeaturePlaceholder } from '../../../../src/components/FeaturePlaceholder';

export default function CurriculumModuleScreen() {
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();

  return (
    <FeaturePlaceholder
      title={`Curriculum Module: ${moduleId || 'Unknown'}`}
      description="Dynamic module route is wired. Module step rendering and response persistence will be ported from LearningModuleRenderer."
    />
  );
}
