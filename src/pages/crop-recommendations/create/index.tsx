import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createCropRecommendation } from 'apiSdk/crop-recommendations';
import { Error } from 'components/error';
import { cropRecommendationValidationSchema } from 'validationSchema/crop-recommendations';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { FarmInterface } from 'interfaces/farm';
import { getFarms } from 'apiSdk/farms';
import { CropRecommendationInterface } from 'interfaces/crop-recommendation';

function CropRecommendationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CropRecommendationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCropRecommendation(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CropRecommendationInterface>({
    initialValues: {
      crop_name: '',
      planting_date: new Date(new Date().toDateString()),
      created_at: new Date(new Date().toDateString()),
      updated_at: new Date(new Date().toDateString()),
      farm_id: (router.query.farm_id as string) ?? null,
    },
    validationSchema: cropRecommendationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Crop Recommendation
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="crop_name" mb="4" isInvalid={!!formik.errors?.crop_name}>
            <FormLabel>Crop Name</FormLabel>
            <Input type="text" name="crop_name" value={formik.values?.crop_name} onChange={formik.handleChange} />
            {formik.errors.crop_name && <FormErrorMessage>{formik.errors?.crop_name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="planting_date" mb="4">
            <FormLabel>Planting Date</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.planting_date}
              onChange={(value: Date) => formik.setFieldValue('planting_date', value)}
            />
          </FormControl>
          <FormControl id="created_at" mb="4">
            <FormLabel>Created At</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.created_at}
              onChange={(value: Date) => formik.setFieldValue('created_at', value)}
            />
          </FormControl>
          <FormControl id="updated_at" mb="4">
            <FormLabel>Updated At</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.updated_at}
              onChange={(value: Date) => formik.setFieldValue('updated_at', value)}
            />
          </FormControl>
          <AsyncSelect<FarmInterface>
            formik={formik}
            name={'farm_id'}
            label={'Select Farm'}
            placeholder={'Select Farm'}
            fetcher={getFarms}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'crop_recommendation',
  operation: AccessOperationEnum.CREATE,
})(CropRecommendationCreatePage);
