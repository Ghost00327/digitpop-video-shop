import { ValidatorFn, FormControl } from '@angular/forms';

export class FileValidatorUtil {
  static fileMaxSize(maxSize: number): ValidatorFn {
    const validatorFn = (file: File) => {
      console.log(file);
      if (file instanceof File && file.size > maxSize) {
        return {
          fileMinSize: { requiredSize: maxSize, actualSize: file.size, file },
        };
      } else {
        return null;
      }
    };
    return FileValidatorUtil.fileValidation(validatorFn);
  }

  static fileMinSize(minSize: number): ValidatorFn {
    const validatorFn = (file: File) => {
      if (file instanceof File && file.size < minSize) {
        return {
          fileMinSize: { requiredSize: minSize, actualSize: file.size, file },
        };
      } else {
        return null;
        // return {
        //   fileMinSize: { requiredSize: minSize, actualSize: file.size, file },
        // };
      }
    };
    return FileValidatorUtil.fileValidation(validatorFn);
  }

  /**
   * extensions must not contain dot
   */
  static fileExtensions(allowedExtensions: Array<string>): ValidatorFn {
    const validatorFn = (file: File) => {
      if (allowedExtensions.length === 0) {
        return null;
      }

      if (file instanceof File) {
        const ext = FileValidatorUtil.getExtension(file.name);
        if (allowedExtensions.indexOf(ext) === -1) {
          return {
            fileExtension: {
              allowedExtensions: allowedExtensions,
              actualExtension: file.type,
              file,
            },
          };
        }
        else
        {
          return null;
        }
      }
      else {
        return null;
      }

    };
    return FileValidatorUtil.fileValidation(validatorFn);
  }

  private static getExtension(filename: string): null | string {
    if (filename.indexOf('.') === -1) {
      return null;
    }
    return filename.split('.').pop();
  }

  private static fileValidation(
    validatorFn: (File: any) => null | object
  ): ValidatorFn {
    return (formControl: FormControl) => {
      if (!formControl.value) {
        return null;
      }

      const files: File[] = [];
      const isMultiple = Array.isArray(formControl.value);
      isMultiple
        ? formControl.value.forEach((file: File) => files.push(file))
        : files.push(formControl.value);

      for (const file of files) {
        return validatorFn(file);
      }

      return null;
    };
  }
}
