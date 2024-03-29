import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.scss'
})
export class PostCarComponent {

  postCarForm!: FormGroup;
  isSpinning: boolean = false;
  selectedFile: File | null | undefined;
  imagePreview: string | ArrayBuffer | null | undefined;
  listOfOption: Array<{ label: string; value: string} > = [];
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

  color: string | null | undefined;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.postCarForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
    })
  }

  postCar() {
    console.log(this.postCarForm.value);
    const formData: FormData = new FormData();
    formData.append('img', this.selectedFile ?? '');
    formData.append('brand', this.postCarForm.get('brand')?.value ?? '');
    formData.append('name', this.postCarForm.get('name')?.value ?? '');
    formData.append('type', this.postCarForm.get('type')?.value ?? '');
    formData.append('color', this.postCarForm.get('color')?.value ?? '');
    formData.append('year', this.postCarForm.get('year')?.value ?? '');
    formData.append('transmission', this.postCarForm.get('transmission')?.value ?? '');
    formData.append('description', this.postCarForm.get('description')?.value ?? '');
    formData.append('price', this.postCarForm.get('price')?.value ?? '');

    console.log(formData);

    // Reset the form after submission
    this.postCarForm.reset();
  }

  onFileSelected(event: any) {
    this.selectedFile = event?.target.files[0];
    this.previewImage();
  }

  previewImage(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.imagePreview = event.target?.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

}
