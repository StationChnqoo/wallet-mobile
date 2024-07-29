import type {PropsWithChildren} from 'react';
import React from 'react';
import {ScrollView, StyleSheet, Text, useColorScheme, View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {RootStacksProp} from '..';
import SuggestTips from './components/SuggestTips';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

interface MyProps {
  navigation?: RootStacksProp;
}

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const HomeScreen: React.FC<MyProps> = props => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f0f0f0'}}>
      <View
        style={{height: useSafeAreaInsets().top, backgroundColor: '#fff'}}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        <View style={{paddingHorizontal: 15}}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <SuggestTips onClosePress={() => {}} />
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default HomeScreen;
