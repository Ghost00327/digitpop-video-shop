import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as _ from 'lodash';
import { Router, Params } from '@angular/router';
import { VideoService } from '../../shared/services/video.service';
import { ImageService } from '../../shared/services/image.service';
import { ProjectService } from '../../shared/services/project.service';
import { ProductGroupService } from '../../shared/services/product-group.service';
import { ProductService } from '../../shared/services/product.service';
import { Project } from 'projects/DigitPop-Player/src/app/models/project';
import { TitleHelpComponent } from '../help/title/title-help.component';
import { ProjectWizardHelpComponent } from '../help/project/project-wizard-help.component';
import { FileValidatorUtil } from '../../shared/utility/FileValidator';
import { ProductGroup } from 'projects/DigitPop-Player/src/app/models/productGroup';
import {
  Product,
  ProductImage,
} from 'projects/DigitPop-Player/src/app/models/product';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { VideoHelpComponent } from '../help/video/video-help.component';
import { ProductHelpComponent } from '../help/product/product-help.component';
import { ProductGroupHelpComponent } from '../help/product-group/product-group-help.component';
import { ProductGroupsHelpComponent } from '../help/product-groups/product-groups-help.component';
import { ThumbnailHelpComponent } from '../help/thumbnail/thumbnail-help.component';
import { PreviewHelpComponent } from '../help/preview/preview-help.component';
import { PreviewComponent } from '../preview/preview.component';

@Component({
  selector: 'DigitPop-project-wizard',
  templateUrl: './project-wizard.component.html',
  styleUrls: ['./project-wizard.component.scss'],
})
export class ProjectWizardComponent implements OnInit {
  isLinear = false;
  projectFormGroup: FormGroup;
  readonly maxSize = 104857600;
  uploadStatus: any;
  uploadComplete = false;
  imageUploadComplete = false;
  numberProductGroups: Number;
  project: any;
  allowedExtensions = ['mp4'];
  params: Params;
  editFlag = false;
  copyClipboardText = 'Copy to clipboard';

  constructor(
    private videoService: VideoService,
    private imageService: ImageService,
    private projectService: ProjectService,
    private productGroupService: ProductGroupService,
    private dialog: MatDialog,
    private productService: ProductService,
    private router: Router
  ) {
    // Logic to determine if we're editing an existing project or creating a new one
    var nav = this.router.getCurrentNavigation();

    if (
      nav != null &&
      nav.extras != null &&
      nav.extras.state != null &&
      nav.extras.state.project != null
    ) {
      this.project = this.router.getCurrentNavigation().extras.state.project;
      this.editFlag = true;
    } else {
      this.project = new Project();
    }
  }

  onTitleHelp(): void {
    const dialogRef = this.dialog.open(TitleHelpComponent, {
      width: '100%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  onVideoHelp(): void {
    const dialogRef = this.dialog.open(VideoHelpComponent, {
      width: '100%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  onProductHelp(): void {
    const dialogRef = this.dialog.open(ProductHelpComponent, {
      width: '100%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  onProductGroupHelp(): void {
    const dialogRef = this.dialog.open(ProductGroupHelpComponent, {
      width: '100%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  onProductGroupsHelp(): void {
    const dialogRef = this.dialog.open(ProductGroupsHelpComponent, {
      width: '100%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  onThumbnailHelp(): void {
    const dialogRef = this.dialog.open(ThumbnailHelpComponent, {
      width: '100%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  onPreviewHelp(): void {
    const dialogRef = this.dialog.open(PreviewHelpComponent, {
      width: '100%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openHelpDialog(): void {
    const dialogRef = this.dialog.open(ProjectWizardHelpComponent, {
      width: '100%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.projectFormGroup = new FormGroup({
      title: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(100)],
        updateOn: 'blur',
      }),
      category: new FormControl('', Validators.required),
      description: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      video: new FormControl(
        '',
        Validators.compose([
          FileValidatorUtil.fileMinSize(1),
          FileValidatorUtil.fileExtensions(this.allowedExtensions),
        ])
      ),
      thumbnail: new FormControl(''),
      productGroups: new FormArray([], Validators.required),
    });

    this.projectFormGroup.get('title').valueChanges.subscribe(() => {
      this.project.name = this.projectFormGroup.get('title').value;
      this.updateProject();
    });

    this.projectFormGroup.get('productGroups').valueChanges.subscribe(() => {
      // this.project.productGroupTimeLine = this.projectFormGroup.get(
      //   'productGroups'
      // ).value;
      //this.updateProject();
    });

    if (this.editFlag) {
      this.projectFormGroup
        .get('title')
        .setValue(this.project.name, { emitEvent: false });
      // this.projectFormGroup
      //   .get('description')
      //   .setValue(this.project.description);

      for (
        let counter = 0;
        counter < this.project.productGroupTimeLine.length;
        counter++
      ) {
        var productGroupFormGroup = this.addProductGroupItem();

        productGroupFormGroup
          .get('title')
          .setValue(this.project.productGroupTimeLine[counter]?.title, {
            emitEvent: false,
          });
        productGroupFormGroup
          .get('description')
          .setValue(this.project.productGroupTimeLine[counter].description, {
            emitEvent: false,
          });
        productGroupFormGroup
          .get('subtitle')
          .setValue(this.project.productGroupTimeLine[counter]?.subtitle, {
            emitEvent: false,
          });
        productGroupFormGroup
          .get('time')
          .setValue(this.project.productGroupTimeLine[counter]?.time, {
            emitEvent: false,
          });
        productGroupFormGroup
          .get('_id')
          .setValue(this.project.productGroupTimeLine[counter]._id, {
            emitEvent: false,
          });

        this.addEventsProductGroupItem(productGroupFormGroup);

        for (
          let counter2 = 0;
          counter2 < this.project.productGroupTimeLine[counter].products.length;
          counter2++
        ) {
          var productFormGroup = this.addProductItem(
            this.project.productGroupTimeLine[counter]
          );

          productFormGroup
            .get('name')
            .setValue(
              this.project.productGroupTimeLine[counter].products[counter2]
                ?.name
            );
          productFormGroup
            .get('description')
            .setValue(
              this.project.productGroupTimeLine[counter].products[counter2]
                ?.description
            );
          productFormGroup
            .get('subtitle')
            .setValue(
              this.project.productGroupTimeLine[counter].products[counter2]
                ?.subtitle
            );
          productFormGroup
            .get('price')
            .setValue(
              this.project.productGroupTimeLine[counter].products[counter2]
                ?.price
            );
          productFormGroup
            .get('makeThisYourLookURL')
            .setValue(
              this.project.productGroupTimeLine[counter].products[counter2]
                ?.makeThisYourLookURL
            );
          productFormGroup
            .get('_id')
            .setValue(
              this.project.productGroupTimeLine[counter].products[counter2]?._id
            );

          for (
            let counter3 = 0;
            counter3 <
            this.project.productGroupTimeLine[counter].products[counter2].images
              .length;
            counter3++
          ) {
            var fg = new FormGroup({
              imageFile: new FormControl('', [
                FileValidatorUtil.fileMinSize(1),
                FileValidatorUtil.fileExtensions(this.allowedExtensions),
              ]),
              imageResult: new FormControl('', Validators.required),
            });

            fg.get('imageFile').setValue(
              this.project.productGroupTimeLine[counter].products[counter2]
                .images[counter3].url
            );

            (productFormGroup.get('images') as FormArray).push(fg);
          }

          productFormGroup = this.addEventsProductItem(productFormGroup);
        }
      }
    } else {
      this.createNewProject();
    }
  }

  getProject(id: any) {
    console.log('About to get the project in getProject()');
    this.projectService.getProject(id).subscribe(
      (res) => {
        console.log('getProject result : ' + JSON.stringify(res));
        this.project = res;
        return res;
      },
      (err) => {
        console.log('Update error : ' + err.toString());
      }
    );
  }

  updateProjectProductGroups() {
    this.projectService.updateProjectProductGroups(this.project).subscribe(
      (res) => {
        return res;
      },
      (err) => {
        console.log('Update error : ' + err.toString());
      }
    );
  }

  updateProject() {
    this.projectService.updateProject(this.project).subscribe(
      (res) => {
        return res;
      },
      (err) => {
        console.log('Update error : ' + err.toString());
      }
    );
  }

  updateProductGroupDeleteProduct(pg: ProductGroup) {
    console.log('In updateProductGroup()');
    this.productGroupService.updateProductGroupDeleteProduct(pg).subscribe(
      (res) => {
        console.log(
          'Product Group Update Delete Product response : ' + res.toString()
        );
      },
      (err) => {
        console.log(
          'Product Group Update Delete Product error : ' + err.toString()
        );
      }
    );
  }

  updateProductGroup(pg: ProductGroup) {
    console.log('In updateProductGroup()');
    this.productGroupService.updateProductGroup(pg).subscribe(
      (res) => {
        console.log('Product Group Update response : ' + res.toString());
      },
      (err) => {
        console.log('Product Group Update Update error : ' + err.toString());
      }
    );
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product).subscribe(
      (res) => {
        console.log('Update response : ' + res.toString());
      },
      (err) => {
        console.log('Update error : ' + err.toString());
      }
    );
  }

  updateProductImages(product: Product) {
    this.productService.updateProductImages(product).subscribe(
      (res) => {
        console.log('Update response : ' + res.toString());
      },
      (err) => {
        console.log('Update error : ' + err.toString());
      }
    );
  }

  createNewProject() {
    this.projectService.addProject(this.project).subscribe(
      (res) => {
        this.project._id = res._id;
        console.log('Subscribed response : ' + res.toString());
      },
      (err) => {
        console.log('Error : ' + err);
      }
    );
  }

  createNewProductGroup(pg: ProductGroup) {
    this.productGroupService.createProductGroup(this.project, pg).subscribe(
      (res) => {
        return res;
      },
      (err) => {
        console.log('Error : ' + err);
      }
    );
  }

  onDeleteProductImage(i: any, j: any, k: any) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Product Image',
        message: 'Are you sure you want to delete this Product Image?',
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        (((this.projectFormGroup.get('productGroups') as FormArray).controls[
          i
        ].get('products') as FormArray).controls[j].get(
          'images'
        ) as FormArray).removeAt(k);

        this.project.productGroupTimeLine[i].products[j].images.splice(k, 1);
        this.updateProductImages(
          this.project.productGroupTimeLine[i].products[j]
        );
      }
    });
  }

  onSubmitProject() {
    this.projectService.addProject(this.project).subscribe(
      (res) => {
        console.log('Subscribed response : ' + res.toString());
      },
      (err) => {
        console.log('Error : ' + err);
      }
    );
  }

  onDeleteProduct(i: any, j: any) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Product',
        message: 'Are you sure you want to delete this Product?',
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        ((this.projectFormGroup.get('productGroups') as FormArray).controls[
          i
        ].get('products') as FormArray).removeAt(j);

        var deletedElement = this.project.productGroupTimeLine[
          i
        ].products.splice(j, 1);
        console.log('DELETED ELEMENT : ' + JSON.stringify(deletedElement));
        this.updateProductGroupDeleteProduct(
          this.project.productGroupTimeLine[i]
        );
        this.getProject(this.project._id);
      }
    });
  }

  onDeleteProductGroup(i: any, pg: ProductGroup) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Product Group',
        message: 'Are you sure you want to delete this Product Group?',
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.productGroupService.deleteProductGroup(pg).subscribe(
          (res) => {
            (this.projectFormGroup.controls
              .productGroups as FormArray).removeAt(i);
            this.project.productGroupTimeLine.splice(i, 1);

            this.updateProjectProductGroups();
            return res;
          },
          (err) => {
            console.log('Update error : ' + err.toString());
          }
        );
      }
    });
  }

  onSubmit() {
    this.videoService
      .upload(this.projectFormGroup.value.video.files[0])
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              if (Math.round((100 * event.loaded) / event.total) == 100) {
                this.uploadComplete = true;
              }
              return (this.uploadStatus = Math.round(
                (100 * event.loaded) / event.total
              ));

            case HttpEventType.Response:
              this.project.media = event.body;
              this.updateProject();
              return true;

            default:
              return `Unhandled event: ${event.type}`;
          }
        })
      )
      .subscribe(
        (res) => {
          console.log('Video upload subscription result : ' + res);
        },
        (err) => {
          console.log('Error : ' + err);
        }
      );
  }

  onSubmitThumbnail() {
    this.imageService
      .upload(this.projectFormGroup.value.thumbnail.files[0])
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              if (Math.round((100 * event.loaded) / event.total) == 100) {
                this.imageUploadComplete = true;
              }
              return (this.uploadStatus = Math.round(
                (100 * event.loaded) / event.total
              ));

            case HttpEventType.Response:
              this.project.thumbnail = event.body;
              this.updateProject();
              return true;
            default:
              return `Unhandled event: ${event.type}`;
          }
        })
      )
      .subscribe(
        (res) => {
          console.log('Response log : ' + res);
        },
        (err) => {
          console.log('Error : ' + err);
        }
      );
  }

  onAddImage() {}

  onSubmitProductImage(i: any, j: any, k: any) {
    this.imageService
      .upload(
        ((this.getProductImageArray(i, j) as FormArray).controls[
          k
        ] as FormGroup).controls['imageFile'].value.files[0]
      )
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              if (Math.round((100 * event.loaded) / event.total) == 100) {
                this.imageUploadComplete = true;
              }
              return (this.uploadStatus = Math.round(
                (100 * event.loaded) / event.total
              ));

            case HttpEventType.Response:
              this.project.productGroupTimeLine[i].products[j].images.push(
                new ProductImage(event.body)
              );

              this.updateProductImages(
                this.project.productGroupTimeLine[i].products[j]
              );

              return true;
            default:
              return `Unhandled event: ${event.type}`;
          }
        })
      )
      .subscribe(
        (res) => {
          console.log('Subscribed response : ' + res.toString());
        },
        (err) => {
          console.log('Error : ' + err);
        }
      );
  }

  addProductGroupItem(): FormGroup {
    var formgroup = new FormGroup({
      id: new FormControl('', Validators.required),
      _id: new FormControl(''),
      title: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      description: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      subtitle: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      time: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      thumbnail: new FormControl('', Validators.required),
      products: new FormArray([]),
    });

    (this.projectFormGroup.controls.productGroups as FormArray).push(formgroup);

    return formgroup;
  }

  addEventsProductGroupItem(formgroup: any) {
    formgroup.get('title').valueChanges.subscribe(() => {
      var pg = _.find(this.project.productGroupTimeLine, {
        _id: formgroup.get('_id').value,
      });

      if (pg != null) {
        pg.title = formgroup.get('title').value;
        this.updateProductGroup(pg);
      }
    });

    formgroup.get('description').valueChanges.subscribe(() => {
      var pg = _.find(this.project.productGroupTimeLine, {
        _id: formgroup.get('_id').value,
      });

      if (pg != null) {
        pg.description = formgroup.get('description').value;
        this.updateProductGroup(pg);
      }
    });

    formgroup.get('subtitle').valueChanges.subscribe(() => {
      var pg = _.find(this.project.productGroupTimeLine, {
        _id: formgroup.get('_id').value,
      });

      if (pg != null) {
        pg.subtitle = formgroup.get('subtitle').value;
        this.updateProductGroup(pg);
      }
    });

    formgroup.get('time').valueChanges.subscribe(() => {
      var pg = _.find(this.project.productGroupTimeLine, {
        _id: formgroup.get('_id').value,
      });

      if (pg != null) {
        pg.time = formgroup.get('time').value;
        this.updateProductGroup(pg);
      }
    });

    formgroup.get('thumbnail').valueChanges.subscribe((selectedValue: any) => {
      var pg = _.find(this.project.productGroupTimeLine, {
        _id: formgroup.get('_id').value,
      });

      this.imageService
        .upload(selectedValue.files[0])
        .pipe(
          map((event) => {
            switch (event.type) {
              case HttpEventType.UploadProgress:
                if (Math.round((100 * event.loaded) / event.total) == 100) {
                  // How can we replace this boolean with a bool specific to the pg???
                  // this.imageUploadComplete = true;
                }
                return (this.uploadStatus = Math.round(
                  (100 * event.loaded) / event.total
                ));

              case HttpEventType.Response:
                pg.thumbnail = event.body;
                this.updateProductGroup(pg);
                return true;
              default:
                return `Unhandled event: ${event.type}`;
            }
          })
        )
        .subscribe(
          (res) => {
            console.log('Response log : ' + res);
          },
          (err) => {
            console.log('Error : ' + err);
          }
        );
    });

    return formgroup;
  }

  addProductGroup() {
    var productGroup = new ProductGroup();

    this.productGroupService
      .createProductGroup(this.project, productGroup)
      .subscribe(
        (res) => {
          productGroup._id = res._id;
          var formGroup = this.addProductGroupItem();
          this.addEventsProductGroupItem(formGroup);
          formGroup.get('_id').setValue(productGroup._id);

          this.project.productGroupTimeLine.push(productGroup);
        },
        (err) => {
          console.log('Error : ' + err);
        }
      );
  }

  addProduct(i: any) {
    var productGroup = this.project.productGroupTimeLine[i];
    var product = new Product();

    this.productService
      .createProduct(this.project, productGroup, product)
      .subscribe(
        (res) => {
          product._id = res._id;
          var formGroup = this.addProductItem(
            this.project.productGroupTimeLine[i]
          );
          formGroup = this.addEventsProductItem(formGroup);
          formGroup.get('_id').setValue(product._id);

          this.project.productGroupTimeLine[i].products.push(product);
        },
        (err) => {
          console.log('Error : ' + err);
        }
      );
  }

  addProductImage(i: any, j: any) {
    // Look for existing product group
    var productGroup = this.project.productGroupTimeLine[i];

    if (productGroup != null) {
      // Look for existing product
      var product = productGroup.products[j];

      if (product == null) {
        productGroup.products.push(new Product());
      }
    } else {
      this.project.productGroupTimeLine.push(new ProductGroup(new Product()));
    }

    (this.getProductImageArray(i, j) as FormArray).push(
      new FormGroup({
        imageFile: new FormControl('', [
          FileValidatorUtil.fileMinSize(1),
          FileValidatorUtil.fileExtensions(this.allowedExtensions),
        ]),
        imageResult: new FormControl('', Validators.required),
      })
    );
  }

  addProductItem(productGroup: any) {
    var formgroup = new FormGroup({
      _id: new FormControl(''),
      name: new FormControl('', {
        updateOn: 'blur',
      }),
      description: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      subtitle: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      price: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      makeThisYourLookURL: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      images: new FormArray([]),
    });

    var pg;

    for (
      let counter = 0;
      counter <
      (this.projectFormGroup.get('productGroups') as FormArray).controls.length;
      counter++
    ) {
      var item = (this.projectFormGroup.get('productGroups') as FormArray)
        .controls[counter];

      if (item.value._id == productGroup._id) {
        pg = item;
      }
    }

    var productsFormArray = pg.get('products') as FormArray;
    productsFormArray.push(formgroup);

    return formgroup;
  }

  addEventsProductItem(formgroup: any) {
    formgroup.get('name').valueChanges.subscribe(() => {
      var pgFormGroup = formgroup.parent.parent;

      if (pgFormGroup != null) {
        var pg = _.find(this.project.productGroupTimeLine, {
          _id: pgFormGroup.get('_id').value,
        });

        if (pg != null) {
          var product = _.find(pg.products, {
            _id: formgroup.get('_id').value,
          });

          if (product != null) {
            product.name = formgroup.get('name').value;
            this.updateProduct(product);
          }
        }
      }
    });

    formgroup.get('description').valueChanges.subscribe(() => {
      var pgFormGroup = formgroup.parent.parent;

      if (pgFormGroup != null) {
        var pg = _.find(this.project.productGroupTimeLine, {
          _id: pgFormGroup.get('_id').value,
        });

        if (pg != null) {
          var product = _.find(pg.products, {
            _id: formgroup.get('_id').value,
          });
          if (product != null) {
            product.description = formgroup.get('description').value;
            this.updateProduct(product);
          }
        }
      }
    });

    formgroup.get('subtitle').valueChanges.subscribe(() => {
      var pgFormGroup = formgroup.parent.parent;

      if (pgFormGroup != null) {
        var pg = _.find(this.project.productGroupTimeLine, {
          _id: pgFormGroup.get('_id').value,
        });

        if (pg != null) {
          var product = _.find(pg.products, {
            _id: formgroup.get('_id').value,
          });
          if (product != null) {
            product.subtitle = formgroup.get('subtitle').value;
            this.updateProduct(product);
          }
        }
      }
    });

    formgroup.get('price').valueChanges.subscribe(() => {
      var pgFormGroup = formgroup.parent.parent;

      if (pgFormGroup != null) {
        var pg = _.find(this.project.productGroupTimeLine, {
          _id: pgFormGroup.get('_id').value,
        });

        if (pg != null) {
          var product = _.find(pg.products, {
            _id: formgroup.get('_id').value,
          });

          if (product != null) {
            product.price = formgroup.get('price').value;
            this.updateProduct(product);
          }
        }
      }
    });

    formgroup.get('makeThisYourLookURL').valueChanges.subscribe(() => {
      var pgFormGroup = formgroup.parent.parent;

      if (pgFormGroup != null) {
        var pg = _.find(this.project.productGroupTimeLine, {
          _id: pgFormGroup.get('_id').value,
        });

        if (pg != null) {
          var product = _.find(pg.products, {
            _id: formgroup.get('_id').value,
          });

          if (product != null) {
            product.makeThisYourLookURL = formgroup.get(
              'makeThisYourLookURL'
            ).value;
            this.updateProduct(product);
          }
        }
      }
    });

    return formgroup;
  }

  getProductImageArray(i: any, j: any) {
    var test1 = this.projectFormGroup.get('productGroups') as FormArray;
    var test2 = test1.controls[i].get('products') as FormGroup;
    return test2.controls[j].get('images');
  }

  getProductImageArrayControls(i: any, j: any) {
    var test1 = this.projectFormGroup.get('productGroups') as FormArray;
    var test2 = test1.controls[i].get('products') as FormGroup;
    return (test2.controls[j].get('images') as FormArray).controls;
  }

  getProductGroupControls() {
    var formArray = this.projectFormGroup.get('productGroups') as FormArray;
    return formArray.controls;
  }

  getProductControls(i: any) {
    return (this.projectFormGroup.get('productGroups') as FormArray).controls[
      i
    ].get('products') as FormArray;
  }

  // onNumberProductGroups() {
  //   for (let index = 0; index < this.numberProductGroups; index++) {
  //     this.project.productGroups.push(new ProductGroup());
  //     this.addProductGroupItem();
  //   }
  // }

  getProductsFormGroup(productGroupIndex: any) {
    return (this.projectFormGroup.get('productGroups') as FormArray).controls[
      productGroupIndex
    ].get('products') as FormGroup;
  }

  getProductsFromProductFormGroup(productGroupIndex: any) {
    return ((this.projectFormGroup.get('productGroups') as FormArray).controls[
      productGroupIndex
    ].get('products') as FormGroup).controls;
  }

  onTempBreak() {}

  // getCategories() {
  //   this.categoryService.getCategories().subscribe(
  //     (res) => {
  //       this.categories = res;
  //     },
  //     (err) => {
  //       console.log('Error retrieving categories : ' + err.ToString());
  //     }
  //   );
  // }

  preview() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      id: this.project._id,
    };

    const dialogRef = this.dialog.open(PreviewComponent, dialogConfig);
  }

  onCopyToClipboard() {
    this.copyClipboardText = 'Copied';
  }

  onResetCopyToClipboardText() {
    this.copyClipboardText = 'Copy to clipboard';
  }
}
